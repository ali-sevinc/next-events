import { NextApiRequest, NextApiResponse } from "next";
import { emailRegex } from "@/components/input/NewsletterRegistration";
import { connection, inserting } from "@/helpers/db-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const eventId = req.body.id;
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
      res
        .status(422)
        .json({ message: "Entered values not valid", comment: {} });
      return;
    }

    const comment: {
      eventId: string;
      email: string;
      name: string;
      text: string;
    } = {
      eventId,
      email,
      name,
      text,
    };
    let client;
    try {
      client = await connection();
    } catch (error) {
      res.status(500).json({ message: "Connectin data base failed..." });
      return;
    }
    try {
      await inserting("events", client, "comments", comment);
      res.status(201).json({ message: "Success", comment });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed..." });
      return;
    } finally {
      client.close();
    }
  }
}
