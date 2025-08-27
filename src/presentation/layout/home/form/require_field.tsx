import { Dropdown, FileUpload, TextField } from "@/presentation/components";
import { form } from "@/presentation/controller/home";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC } from "react";

const core: FC = () => {
  const requireField = form.requireField;
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) form.setFile(file);
  };

  const handleMachineSelect = (value: string) => {
    const active = document.activeElement as HTMLElement;
    requireField.handleChangeMachine(value);
    if (active) active.blur();
  };

  return (
    <fieldset className="bg-base-300 border-base-300 rounded-box fieldset space-y-2 border p-4">
      <legend className="fieldset-legend text-lg font-semibold text-gray-700">
        Require
      </legend>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        <TextField
          name="pcbNumber"
          label="PCB Number"
          placeholder="PCB number"
          value={requireField.pcbNumber}
          onChange={requireField.handleChange}
        />
        <TextField
          name="screenMaskNumber"
          label="Screen mask number"
          placeholder="Screen mask number"
          value={requireField.screenMaskNumber}
          onChange={requireField.handleChange}
        />
        <TextField
          name="serialDC"
          label="Serial D/C"
          placeholder="Serial D/C"
          value={requireField.serialDC}
          onChange={requireField.handleChange}
        />
        <Dropdown
          label="Solder"
          value={requireField.solder.join(",")}
          options={form.solders}
          onSelect={requireField.toggleSolderCheck}
          multiSelect
          checkFn={requireField.isSolderCheck}
        />
        <Dropdown
          label="Machine"
          value={requireField.machine}
          options={form.machines}
          onSelect={handleMachineSelect}
        />
        <FileUpload
          label="Feeder File"
          fileLabel={form.file}
          onChange={handleFileChange}
          accept=".txt,.csv"
        />
      </div>
    </fieldset>
  );
};

export const RequireField = observer(core);
