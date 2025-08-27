import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const api = process.env.SERVER_API;
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const response = await axios.get(`http://${api}/constant/`);
    if (response.status === 200) {
      const data = response.data;
      return res.status(200).json({
        solders: data.solders,
        solderFeed: data.solder_feed,
        maskFeed: data.mask_feed,
        backupPlateFeed: data.backup_plate_feed,
        machines: data.machines,
      });
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
