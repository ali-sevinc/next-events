import { NextApiRequest, NextApiResponse } from "next";
import { connection, getData } from "@/helpers/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id;

    if (!id) {
      res.status(400).json({ message: "Unvalid id" });
      return;
    }
    let client;
    try {
      client = await connection();
    } catch (error) {
      res.status(500).json({ message: "Connection failed" });
      return;
    }

    try {
      const result = await getData(
        client,
        "comments",
        { eventId: id },
        { _id: -1 }
      );
      res.status(200).json({ message: "Success", selectedComments: result });
    } catch (error) {
      res.status(500).json({ message: "Fetching data failed..." });
      return;
    } finally {
      client.close();
    }
  }
}
