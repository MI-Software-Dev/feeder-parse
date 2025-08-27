import { form } from "@/presentation/controller/home";
import { observer } from "mobx-react-lite";

import { OptionalField } from "./optional_field";
import { RequireField } from "./require_field";
import { FC, useEffect } from "react";

// Main Form Component
const Core: FC = () => {
  useEffect(() => {
    form.onPendding();
  }, []);

  if (!form.pendding) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="skeleton h-20 w-full rounded-sm"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col space-y-2">
      <RequireField />
      <OptionalField />
    </div>
  );
};

export const Form = observer(Core);
