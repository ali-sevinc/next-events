import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";
import { emailRegex } from "@/components/input/NewsletterRegistration";

export function getCommentsFilePath() {
  const filePath = path.join(process.cwd(), "data", "comments.json");
  return filePath;
}

export function getCommentsData(filePath: string) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData.toString());
  return data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const filePath = getCommentsFilePath();
    const data = getCommentsData(filePath);
    const id = req.body.id;
    const email = req.body.email;
    const name = req.body.name;
    const text = req.body.text;

    if (
      !emailRegex.test(email) ||
      !name ||
      !text ||
      name.trim().length < 2 ||
      text.trim().length < 2
    ) {
      const selectedComments = data.find(
        (item: { id: string }) => item.id === id
      );
      res
        .status(422)
        .json({ message: "Entered values not valid", data: selectedComments });
      return;
    }

    if (data.find((item: { id: string }) => item.id === id)) {
      data
        .find((item: { id: string }) => item.id === id)
        .body.push({
          commentId: crypto.randomUUID(),
          email,
          name,
          text,
        });
    } else {
      data.push({
        id,
        body: [
          {
            commentId: crypto.randomUUID(),
            email,
            name,
            text,
          },
        ],
      });
    }
    fs.writeFileSync(filePath, JSON.stringify(data));
    const addedData = data.find((item: { id: string }) => item.id === id);
    res.status(201).json({ message: "Success", data: addedData });
  }
}
