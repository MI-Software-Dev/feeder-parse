import { wrapperError } from "@/data/util";
import {
  downloadFile,
  fetchConstant,
  getFeederContent,
  prepareData,
  validateForm,
} from "@/domain/usecase/home";

import { makeAutoObservable, runInAction } from "mobx";
import { RequireField } from "./require_field";
import { OptionalField } from "./optional_field";

class Form {
  machines: string[] = [];
  solders: string[] = [];
  errors: string[] = [];

  pendding = false;
  file = "";

  solderFeederNumber = "";
  maskFeederNumber = "";
  backupPlateNumber = "";

  requireField = new RequireField();
  optionalField = new OptionalField();

  constructor() {
    makeAutoObservable(this);
  }

  clearField = () => {
    this.file = "";
    this.requireField.clearField();
    this.optionalField.clearField();
  };

  onPendding = async () => {
    this.pendding = false;
    await this.fetchConstant();
    runInAction(() => {
      this.pendding = true;
    });
  };

  fetchConstant = async () => {
    const usecase = await fetchConstant();
    usecase.handle(
      (data) => {
        runInAction(() => {
          this.solders = data.solders;
          this.machines = data.machines;
          this.solderFeederNumber = data.solderFeed.toString();
          this.backupPlateNumber = data.backupPlateFeed.toString();
          this.maskFeederNumber = data.maskFeed.toString();
        });
      },
      () => null,
    );
  };

  getBaseNameWithoutExt = (filePath: string): string =>
    (filePath.split("/").pop() || "").replace(/\.[^/.]+$/, "");

  setFile = (file: File) => {
    this.file = this.getBaseNameWithoutExt(file.name);
    this.requireField.setFileContent(file);
  };

  insertSubPart = (data: string[][]) => {
    this.optionalField.partWithSubParts.forEach((part) => {
      let mainIdx: number | undefined = undefined;
      const mainPart = data.find((item, idx) => {
        if (item[8] === part.main) {
          mainIdx = idx;
          return true;
        }
        return false;
      });

      if (mainPart && mainIdx !== undefined) {
        const subParts = part.sub.map((item) => {
          const subPart = [...mainPart];
          subPart[8] = item;
          return subPart;
        });

        for (let i = subParts.length - 1; i >= 0; i--) {
          data.splice(mainIdx + 1, 0, subParts[i]);
        }
      }
    });
  };

  prepareOutput = async () => {
    return wrapperError(async () => {
      const feederContent = await getFeederContent(
        this.requireField.machine.toLowerCase(),
        this.requireField.fileContent,
      );
      if (feederContent.isFailure()) {
        throw feederContent.error;
      }

      const preparedData = prepareData(
        feederContent.data,
        {
          backupPlate: this.optionalField.backupPlate,
          comment: this.optionalField.comment,
          pcbNumber: this.requireField.pcbNumber,
          screenMaskNumber: this.requireField.screenMaskNumber,
          serialDC: this.requireField.serialDC,
          solder: this.requireField.solder,
        },
        this.solderFeederNumber,
        this.maskFeederNumber,
        this.backupPlateNumber,
      );
      this.insertSubPart(preparedData);
      return preparedData;
    });
  };

  downloadFile = async (content: string[][]) => {
    return await downloadFile(
      this.file,
      content.map((row) => row.join(",")).join("\n"),
    );
  };

  handleSubmit = async (
    onSuccess: (data: string) => void,
    onError: (error: string) => void,
  ) => {
    const validate = validateForm(this.requireField.data);
    if (validate.isFailure()) {
      const formatted = Object.entries(validate.error)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
      onError(formatted);
      return;
    }
    const prepareOutput = await this.prepareOutput();
    prepareOutput.handle(
      async (data) => {
        (
          await downloadFile(this.file, data.map((e) => e.join(",")).join("\n"))
        ).handle(
          () => onSuccess(validate.data!),
          (error) => onError(error),
        );
      },
      (error) => onError(error),
    );
  };
}

export const form = new Form();
