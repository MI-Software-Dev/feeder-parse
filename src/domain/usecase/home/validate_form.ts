import { Failure, Result, Success } from "@/data/model";
import { array, object, string, ValidationError } from "yup";

export const validateForm = (props: {
  machine: string;
  pcbNumber: string;
  screenMaskNumber: string;
  serialDC: string;
  solder: string[];
  fileContent: string;
}): Result<string, Record<string, string>> => {
  const schema = object({
    machine: string().required("Machine is required"),
    pcbNumber: string().required("PCB number is required"),
    serialDC: string()
      .required("Serial D/C is required")
      .test(
        "is-number",
        "Serial D/C must be a number",
        (value) => !isNaN(Number(value)),
      ),
    screenMaskNumber: string().required("Mask number is required"),
    solder: array()
      .of(string())
      .min(1, "You must have at least one solder")
      .required("Solder is required"),
    fileContent: string().required("You must select your file."),
  });

  try {
    schema.validateSync(props, { abortEarly: false });
    return new Success("Validation succeeded");
  } catch (error) {
    if (error instanceof ValidationError && Array.isArray(error.inner)) {
      const errors: Record<string, string> = {};

      for (const err of error.inner) {
        if (err.path && !errors[err.path]) {
          errors[err.path] = err.message;
        }
      }
      return new Failure(errors);
    } else {
      return new Failure({ general: "Unknown validation error" });
    }
  }
};
