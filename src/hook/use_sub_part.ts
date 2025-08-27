import { PartWithSubPart } from "@/data/model";
import { create } from "zustand";

interface SubPartItem {
  value: string;
  index: number;
}

class SubPartDialog {
  update: () => void;
  isOpen = false;
  item: PartWithSubPart = { id: "", main: "", sub: [] };
  subList: SubPartItem[] = [];
  constructor(update: (value: SubPartDialog) => void) {
    this.update = () => update(this);
  }

  handleAdd = () => {
    this.subList.push({
      value: `Sub part ${this.subList.length + 1}`,
      index: this.subList.length,
    });
    this.update();
  };

  handleRemove = (target: SubPartItem) => {
    this.subList = this.subList.filter((item) => item !== target);
    this.update();
  };

  handleChange = (item: SubPartItem, value: string) => {
    item.value = value;
    this.update();
  };

  close = () => {
    this.isOpen = false;
    this.update();
  };

  open = (item: PartWithSubPart) => {
    this.item = item;
    this.subList = item.sub.map((value, index) => ({ value, index }));
    this.isOpen = true;
    this.update();
  };

  submit = () => {
    this.item.sub = this.subList.map((e) => e.value);
    this.close();
  };
}

export const useSubPartDialog = create<SubPartDialog>((set) => {
  const update = (value: SubPartDialog) => set(() => ({ ...value }));
  const instance = new SubPartDialog(update);
  return {
    ...instance,
  };
});
