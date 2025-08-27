import { useStatusDialog } from "@/hook";
import React from "react";

const StatusDialog: React.FC = () => {
  const controller = useStatusDialog((state) => state);
  const isOpen = controller.isOpen;
  const type = controller.type;
  const title = controller.title;
  const message = controller.message;
  const close = controller.close;

  const styles = {
    success: {
      border: "border-green-500",
      text: "text-green-600",
      btn: "btn-success",
    },
    error: {
      border: "border-red-500",
      text: "text-red-600",
      btn: "btn-error",
    },
  }[type];

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div
        className={`modal-box border-l-4 ${styles.border} transform bg-white transition-all duration-200 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"} `}
      >
        <h3 className={`text-lg font-bold ${styles.text}`}>{title}</h3>
        <div className="py-2 text-black">
          {!message.includes(":") ? (
            <h1
              data-success={type == "success"}
              className="font-bold data-[success=false]:text-red-400"
            >
              {message}
            </h1>
          ) : (
            message.split("\n").map((e, idx) => {
              const splitted = e.split(":");
              const key = splitted[0];
              const value = splitted[1];
              return (
                <div key={idx} className="flex flex-row items-baseline gap-x-1">
                  <h1 className="font-bold capitalize">{key}</h1>:
                  <h1
                    className="data-[success=false]:text-red-40 font-bold text-red-400 capitalize"
                    data-success={type == "success"}
                  >
                    {value}
                  </h1>
                </div>
              );
            })
          )}
        </div>
        <div className="modal-action">
          <button
            onClick={() => close()}
            className={`btn btn-sm ${styles.btn} btn-outline hover:text-white`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { StatusDialog };
