import { FC } from "react";

export const Dropdown: FC<{
  label: string;
  value: string | undefined;
  options: string[];
  onSelect: (value: string) => void;
  multiSelect?: boolean;
  checkFn?: (value: string) => boolean;
}> = ({ label, value, options, onSelect, multiSelect, checkFn }) => (
  <div className="flex flex-col gap-y-1">
    <label className="label text-sm font-semibold text-black">{label}</label>
    <div className="dropdown">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-outline flex w-full justify-start border-black text-black hover:bg-black hover:text-white"
      >
        {value || `No ${label.toLowerCase()} chosen`}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-2 w-full bg-white p-2 shadow-sm"
      >
        {options.map((option, idx) => (
          <li key={option + idx}>
            <div
              onClick={() => onSelect(option)}
              className="group flex flex-row items-center justify-between rounded-md px-2 hover:bg-black"
            >
              <div className="text-black group-hover:text-white">{option}</div>
              {multiSelect && checkFn && (
                <input
                  type="checkbox"
                  readOnly
                  checked={checkFn(option)}
                  className="checkbox checkbox-md group-hover:bg-white"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
