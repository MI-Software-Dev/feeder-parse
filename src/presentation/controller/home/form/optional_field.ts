import { PartWithSubPart } from "@/data/model";
import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";
export class OptionalField {
  data = {
    backupPlate: "",
    comment: "",
    partWithSubParts: [] as PartWithSubPart[],
  };
  constructor() {
    makeAutoObservable(this);
  }

  get backupPlate() {
    return this.data.backupPlate;
  }

  get comment() {
    return this.data.comment;
  }

  get partWithSubParts() {
    return this.data.partWithSubParts;
  }

  clearField = () => {
    this.data = {
      comment: "",
      backupPlate: "",
      partWithSubParts: [],
    };
  };

  addNewPartWithSubPart = () => {
    const partWithSubParts = this.partWithSubParts;
    const item: PartWithSubPart = {
      id: v4(),
      main: `Part ${partWithSubParts.length + 1}`,
      sub: [],
    };
    partWithSubParts.push(item);
    this.data = {
      ...this.data,
      partWithSubParts: partWithSubParts,
    };
  };

  removePartWithSubPart = (target: PartWithSubPart) => {
    const partWithSubParts = this.partWithSubParts.filter(
      (item) => item !== target,
    );
    this.data = {
      ...this.data,
      partWithSubParts: partWithSubParts,
    };
  };

  handlePartWithSubPartChange = (item: PartWithSubPart, value: string) => {
    item.main = value;
  };

  handleChange = (name: string, value: string) => {
    this.data = { ...this.data, [name]: value };
  };
}
