import { ChangeEvent, FC } from "react";

export const FileUpload: FC<{
  label: string;
  fileLabel?: string;
  accept?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, fileLabel, accept, onChange }) => (
  <div className="flex flex-col gap-y-1">
    <label className="label text-sm font-semibold text-black">
      {label}: {fileLabel ?? "No file chosen"}
    </label>
    <div className="flex w-full items-center">
      <input
        id={`file-${label}`}
        type="file"
        accept={accept}
        className="hidden"
        onChange={onChange}
      />
      <label
        htmlFor={`file-${label}`}
        className="btn btn-outline w-full cursor-pointer border-black text-black hover:bg-black hover:text-white"
      >
        Upload
      </label>
    </div>
  </div>
);
