import { FC } from "react";

export const TextField: FC<{
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (name: string, value: string) => void;
}> = ({ label, name, value, placeholder, onChange }) => (
  <div className="flex flex-col gap-y-1">
    <label className="label text-sm font-semibold text-black">{label}</label>
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value ?? ""}
      className="h-10 rounded-sm border px-4 text-sm text-black outline-0 placeholder:text-sm placeholder:text-black/50 focus:placeholder:text-black"
      onChange={(e) => onChange(e.target.name, e.target.value)}
    />
  </div>
);
