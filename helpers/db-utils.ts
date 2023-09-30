import { MongoClient } from "mongodb";
const MONGO = process.env.MONGO!;

export async function connection() {
  const client = await MongoClient.connect(MONGO);
  return client;
}

export async function inserting(
  dataBase: string,
  client: MongoClient,
  collection: string,
  data: {}
) {
  const db = client.db(dataBase);
  await db.collection(collection).insertOne(data);
}

export async function getData(
  client: MongoClient,
  collection: string,
  find: {},
  sort: {}
) {
  const db = client.db("events");
  const result = await db
    .collection(collection)
    .find(find)
    .sort(sort)
    .toArray();
  return result;
}
