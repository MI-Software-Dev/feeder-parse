import { useSubPartDialog } from "@/hook";
import { FC } from "react";
import { AiFillDelete } from "react-icons/ai";

export const SubpartDialog: FC = () => {
  const controller = useSubPartDialog((state) => state);
  const subList = controller.subList;
  const item = controller.item;

  return (
    <div className={`modal ${controller.isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row items-baseline justify-between">
            <h1 className="text-lg font-semibold text-gray-700">
              Add Sub Part For: {item.main}
            </h1>
            <button
              className="text-md btn-sm btn"
              onClick={controller.handleAdd}
            >
              Add
            </button>
          </div>
          <div className="divider h-fit" />
          <div className="flex max-h-[250px] flex-col justify-baseline gap-y-2 overflow-y-auto">
            {subList.map((item) => (
              <div className="flex flex-row" key={`${item.index}`}>
                <input
                  defaultValue={item.value}
                  className="text-md h-fit w-full border-b pb-0.5 text-black outline-0"
                  onChange={(e) =>
                    controller.handleChange(item, e.target.value)
                  }
                />
                <button
                  className="btn btn-sm btn-circle text-error bg-white"
                  onClick={() => controller.handleRemove(item)}
                >
                  <AiFillDelete />
                </button>
              </div>
            ))}
          </div>
          <div className="divider h-fit" />
          <div className="flex flex-row gap-x-3">
            <button
              className="btn btn-info text-white"
              onClick={controller.submit}
            >
              ok
            </button>
            <button
              className="btn btn-error text-white"
              onClick={controller.close}
            >
              cancle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
