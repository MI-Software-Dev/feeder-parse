import {} from "@/presentation/components/status_dialog";
import { create } from "zustand";

type StatusType = "success" | "error";

class StatusDialogController {
  update: () => void;
  isOpen = false;
  type: StatusType = "success";
  message: string = "";
  title = "";
  constructor(update: (value: StatusDialogController) => void) {
    this.update = () => update(this);
  }

  close = (fn?: (value?: boolean) => void) => {
    this.isOpen = false;
    this.update();
    if (fn) fn(this.isOpen);
  };

  open = (fn?: (value?: boolean) => void) => {
    this.isOpen = true;
    this.update();
    if (fn) fn(this.isOpen);
  };

  setMessage = (message: string) => {
    this.message = message;
    this.update();
  };

  setTitle = (title: string) => {
    this.title = title;
    this.update();
  };

  setType = (type: StatusType) => {
    this.type = type;
    this.update();
  };
}

export const useStatusDialog = create<StatusDialogController>((set) => {
  const update = (value: StatusDialogController) => set(() => ({ ...value }));
  const instance = new StatusDialogController(update);
  return {
    ...instance,
  };
});
