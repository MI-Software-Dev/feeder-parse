import { Failure, Result, Success } from "../model";

export const wrapperError = async <T>(
  fn: () => Promise<T>
): Promise<Result<T, string>> => {
  try {
    return new Success(await fn());
  } catch (error) {
    return new Failure(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
};
