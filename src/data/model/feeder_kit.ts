export class FeederKit {
  kitName: string;
  processNoMachine: string;
  machineTableSide: string;
  feederNo: string;
  partName: string;
  useCount: number;

  constructor(
    kitName: string,
    processNoMachine: string,
    machineTableSide: string,
    feederNo: string,
    partName: string,
    useCount: number,
  ) {
    this.kitName = kitName;
    this.processNoMachine = processNoMachine;
    this.machineTableSide = machineTableSide;
    this.feederNo = feederNo;
    this.partName = partName;
    this.useCount = useCount;
  }

  static fromRow(row: string[]): FeederKit {
    return new FeederKit(
      row[0], // kitName
      row[1], // processNoMachine
      row[2], // machineTableSide
      row[3], // feederNo
      row[4], // partName
      parseInt(row[5], 10) || 0, // useCount
    );
  }
}
