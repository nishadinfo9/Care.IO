import { MongoClient, ServerApiVersion } from "mongodb";

export const collections = {
  USERS: "users",
  SERVICES: "services",
  BOOKINGS: "bookings",
};

const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db = null;

export const dbConnect = async (collName) => {
  if (!db) {
    await client.connect();
    db = client.db("careDB");
  }
  return db.collection(collName);
};
