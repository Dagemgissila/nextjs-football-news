import { promises as fs } from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      const filePath = path.join(process.cwd(), "data.js");
      const fileContent = `export const predictionData = ${JSON.stringify(
        data,
        null,
        2
      )};\n`;

      await fs.writeFile(filePath, fileContent);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Failed to write file:", error);
      res.status(500).json({ success: false, message: "Failed to save data" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
