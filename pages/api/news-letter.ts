import { NextApiRequest, NextApiResponse } from "next";
import { connection, inserting } from "@/helpers/db-utils";
import { emailRegex } from "@/helpers/fncs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string; email?: string }>
) {
  if (req.method === "POST") {
    const email = req.body.email;

    if (!emailRegex.test(email) || !email) {
      res.status(422).json({ message: "Invalid input", email });
      return;
    }

    let client;
    try {
      client = await connection();
    } catch (error) {
      res.status(500).json({ message: "Connecting the database failed..." });
      return;
    }
    try {
      await inserting("events", client, "newsletter", { email: email });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed..." });
      return;
    } finally {
      client.close();
    }

    res.status(201).json({ message: "Success", email });
  } else {
    res.status(400).json({ message: "Unsupported method" });
  }
}
