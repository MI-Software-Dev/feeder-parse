import { makeAutoObservable } from "mobx";
export class RequireField {
  data = {
    machine: "",
    pcbNumber: "",
    screenMaskNumber: "",
    serialDC: "",
    solder: [] as string[],
    fileContent: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  get machine(): string {
    return this.data.machine;
  }

  get pcbNumber(): string {
    return this.data.pcbNumber;
  }

  get screenMaskNumber(): string {
    return this.data.screenMaskNumber;
  }
  get serialDC(): string {
    return this.data.serialDC;
  }

  get solder() {
    return this.data.solder;
  }

  get fileContent(): string {
    return this.data.fileContent;
  }

  clearField = () => {
    this.data = {
      machine: "",
      pcbNumber: "",
      screenMaskNumber: "",
      serialDC: "",
      solder: [],
      fileContent: "",
    };
  };

  setFileContent = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.data.fileContent = e.target?.result as string;
    };
    reader.readAsText(file);
  };

  toggleSolderCheck = (value: string) => {
    const solder = this.data.solder;
    const updated = solder.includes(value)
      ? solder.filter((s) => s !== value)
      : solder.length < 2
        ? [...solder, value]
        : solder;
    this.data.solder = updated;
  };

  isSolderCheck = (value: string) => this.data.solder.includes(value);

  handleChange = (name: string, value: string) => {
    console.log(name);
    
    this.data = { ...this.data, [name]: value };
  };

  handleChangeMachine = (value: string) => {
    this.data.machine = value;
  };
}
