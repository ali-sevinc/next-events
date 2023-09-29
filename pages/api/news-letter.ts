import { NextApiRequest, NextApiResponse } from "next";
import { emailRegex } from "@/components/input/NewsletterRegistration";

import fs from "fs";
import path from "path";

export function getNewsletterFilePath() {
  const filePath = path.join(process.cwd(), "data", "news-letter.json");
  return filePath;
}

export function getNewsletterData(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; email?: string }>
) {
  if (req.method === "POST") {
    const filePath = getNewsletterFilePath();
    const data = getNewsletterData(filePath);
    const email = req.body.email;

    if (!emailRegex.test(email)) {
      res.status(422).json({ message: "This email is not valid", email });
      return;
    }

    if (data.find((item: { email: string }) => item.email === email)) {
      res.status(403).json({ message: "This email allready taken", email });
      return;
    }
    data.push({
      email,
    });
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success", email });
  } else {
    res.status(400).json({ message: "Unsupported method" });
  }
}
