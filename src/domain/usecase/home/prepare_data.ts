import { FeederKit } from "@/data/model";

export const prepareData = (
  dataDTO: FeederKit[],
  formDTO: {
    pcbNumber: string;
    screenMaskNumber: string;
    serialDC: string;
    solder: string[];
    backupPlate: string;
    comment: string;
  },
  solderFeederNumber: string,
  maskFeederNumber: string,
  backupPlateNumber: string,
) => {
  const serialDC = formDTO.serialDC;
  const comment = formDTO.comment;
  const pcbNumber = formDTO.pcbNumber;
  const solder = formDTO.solder;
  const output = dataDTO.map((kit) => [
    kit.kitName,
    kit.processNoMachine,
    kit.machineTableSide,
    serialDC,
    comment,
    kit.kitName,
    pcbNumber,
    kit.feederNo,
    kit.partName,
    kit.useCount.toString(),
  ]);

  const kitName = output[0][0];
  const processSide = (kitName as string).split("-")[1];
  solder.forEach((value) => {
    output.push([
      kitName,
      processSide,
      "",
      serialDC,
      comment,
      kitName,
      pcbNumber,
      solderFeederNumber,
      value,
      "1",
    ]);
  });
  output.push([
    kitName,
    processSide,
    "",
    serialDC,
    comment,
    kitName,
    pcbNumber,
    maskFeederNumber,
    formDTO.screenMaskNumber,
    "1",
  ]);

  if (formDTO.backupPlate.length != 0) {
    output.push([
      kitName,
      processSide,
      "",
      serialDC,
      comment,
      kitName,
      pcbNumber,
      backupPlateNumber,
      formDTO.backupPlate,
      "1",
    ]);
  }

  return output;
};
