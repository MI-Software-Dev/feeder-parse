import axios from "axios";
import { wrapperError } from "../util";
import { Constant } from "../model";

class ParserRepository {
  async fetchConstant() {
    return wrapperError(async () => {
      const response = await axios.get("/api/constant");
      if (response.status === 200) {
        return response.data as Constant;
      } else {
        throw new Error(response.statusText);
      }
    });
  }

  async parse(content: string, machine: string) {
    return wrapperError(async () => {
      const response = await axios.post("/api/parse", {
        content,
        machine,
      });

      if (response.status === 200) {
        return response.data.result as string; // this is the CSV string from your API
      } else {
        throw new Error(response.statusText);
      }
    });
  }
}

export const parseRepository = new ParserRepository();
