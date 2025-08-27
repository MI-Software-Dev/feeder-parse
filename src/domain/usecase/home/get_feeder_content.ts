import { Failure, FeederKit, Success } from "@/data/model";
import { parseRepository } from "@/data/repository";

export const getFeederContent = async (machine: string, content: string) => {
  const parsed = await parseRepository.parse(content, machine);
  if (parsed.isSuccess()) {
    const rows = parsed.data.split("\n").map((r) => r.split(","));
    const feederKits = rows.slice(1).map((r) => FeederKit.fromRow(r));
    return new Success<FeederKit[], string>(feederKits);
  } else {
    return new Failure<FeederKit[], string>(parsed.error!);
  }
};
