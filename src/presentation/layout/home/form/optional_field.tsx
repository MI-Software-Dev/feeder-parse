import { useSubPartDialog } from "@/hook";
import { TextField } from "@/presentation/components";
import { form } from "@/presentation/controller/home";
import { observer } from "mobx-react-lite";
import { FC } from "react";
import { AiFillDelete } from "react-icons/ai";
import { IoOpen } from "react-icons/io5";

const Core: FC = () => {
  const optionalField = form.optionalField;
  const subpartDialog = useSubPartDialog((state) => state);
  return (
    <fieldset className="bg-base-300 border-base-300 rounded-box fieldset space-y-2 border p-4">
      <legend className="fieldset-legend text-lg font-semibold text-gray-700">
        Optional
      </legend>
      <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
        <TextField
          name="backupPlate"
          label="Backup Plate"
          placeholder="Backup Plate"
          value={optionalField.backupPlate}
          onChange={optionalField.handleChange}
        />
        <TextField
          name="comment"
          label="Comment"
          placeholder="Comment"
          value={optionalField.comment}
          onChange={optionalField.handleChange}
        />
        <div className="flex flex-col md:col-span-2">
          <div className="flex w-full flex-row items-center justify-between">
            <label className="label text-sm font-semibold text-black">
              Part With Sub Part
            </label>
            <button
              className="text-md btn-sm btn"
              onClick={optionalField.addNewPartWithSubPart}
            >
              Add
            </button>
          </div>
          <div className="divider h-fit" />
          <div className="flex flex-col gap-y-3">
            {optionalField.partWithSubParts.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-baseline gap-x-2 rounded-md bg-white p-2"
              >
                <input
                  defaultValue={item.main}
                  className="text-md h-fit w-full text-black underline outline-0"
                  onChange={(e) =>
                    optionalField.handlePartWithSubPartChange(
                      item,
                      e.target.value,
                    )
                  }
                />
                <button
                  className="btn btn-sm btn-circle text-success bg-white"
                  onClick={() => subpartDialog.open(item)}
                >
                  <IoOpen />
                </button>
                <button
                  className="btn btn-sm btn-circle text-error bg-white"
                  onClick={() => optionalField.removePartWithSubPart(item)}
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
          <div className="divider h-fit" />
        </div>
      </div>
    </fieldset>
  );
};

export const OptionalField = observer(Core);
