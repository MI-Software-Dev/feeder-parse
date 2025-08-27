import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import FormData from "form-data";

type Data = {
  error?: string;
  result?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const api = process.env.SERVER_API;
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content, machine } = req.body;
    if (typeof content !== "string" || typeof machine !== "string") {
      return res.status(400).json({ error: "Invalid content or machine" });
    }

    // Create a temporary file from content using FormData
    const formData = new FormData();
    const buffer = Buffer.from(content, "utf-8");
    formData.append("file", buffer, {
      filename: "temp.txt",
      contentType: "text/plain",
    });

    const response = await axios.post(
      `http://${api}/parser/${machine}`,
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    if (response.status === 200) {
      const data = response.data as string[][];
      const csvText = data.map((row) => row.join(",")).join("\n");
      return res.status(200).json({ result: csvText });
    } else {
      return res.status(response.status).json({ error: response.statusText });
    }
  } catch (err) {
    console.error("Parser error:", err);

    if (err instanceof Error) {
      return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
}
