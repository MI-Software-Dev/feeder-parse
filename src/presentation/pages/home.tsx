"use client";
import { StatusDialog, SubpartDialog } from "@/presentation/components";

import { observer } from "mobx-react-lite";

import { Form } from "../layout/home";
import { useStatusDialog } from "@/hook";
import { form } from "../controller/home";

function HomePage() {
  const statusDialog = useStatusDialog((state) => state);

  const handleSubmit = () => {
    form.handleSubmit(
      (data) => {
        statusDialog.setTitle(data);
        statusDialog.setType("success");
        statusDialog.setMessage(
          "The output file has been downloaded successfully.",
        );
        statusDialog.open();
      },
      (error) => {
        statusDialog.setTitle("Validation Error");
        statusDialog.setType("error");
        statusDialog.setMessage(error);
        statusDialog.open();
      },
    );
  };

  return (
    <div className="flex flex-col bg-white">
      <div className="fixed top-0 z-1 flex h-[52px] w-full items-center bg-gray-600 px-3 shadow-2xl">
        <h1 className="text-4xl font-bold text-white">Cad Compare</h1>
      </div>
      <div className="flex h-screen grow flex-col items-center justify-start overflow-y-auto px-[10%] py-8 pt-[60px] pb-[150px] xl:px-[20%] 2xl:px-[30%]">
        <Form />
      </div>
      <div className="fixed bottom-0 z-1 flex w-full flex-col items-center justify-center gap-4 bg-gray-600 p-4 sm:flex-row">
        <button
          className="btn btn-success w-full max-w-[300px] cursor-pointer hover:text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="btn btn-error w-full max-w-[300px] cursor-pointer hover:text-white"
          onClick={form.clearField}
        >
          Clear Field
        </button>
      </div>
      <StatusDialog />
      <SubpartDialog />
    </div>
  );
}

export default observer(HomePage);
