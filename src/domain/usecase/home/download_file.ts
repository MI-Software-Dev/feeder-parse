import { wrapperError } from "@/data/util";

export const downloadFile = (fileName: string, data: string) => {
  return wrapperError(async () => {
    const blob = new Blob([data.toString()], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.csv`);
    link.click();
    URL.revokeObjectURL(url);
  });
};
