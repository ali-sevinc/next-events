import { NextApiRequest, NextApiResponse } from "next";
import { getCommentsData, getCommentsFilePath } from ".";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; selectedComments: [] }>
) {
  if (req.method === "GET") {
    const filePath = getCommentsFilePath();
    const data = getCommentsData(filePath);
    const id = req.query.id;
    const selectedComments = data.find(
      (item: { id: string }) => item.id === id
    );
    res.status(200).json({ message: "Success", selectedComments });
  }
}
