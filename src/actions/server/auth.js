"use server";

import bcrypt from "bcrypt";
import { dbConnect, collections } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const { name, email, password, contact, nidNo } = payload;
  if (!name || !email || !password) return null;

  const usersCollection = await dbConnect(collections.USERS);

  const existUser = await usersCollection.findOne({ email });
  if (existUser) return null;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    contact: contact || "",
    nidNo: nidNo || "",
    role: "user",
    provider: "credentials",
  };

  const result = await usersCollection.insertOne(newUser);

  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }

  return null;
};

export const loggedInUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) return null;

  const usersCollection = await dbConnect(collections.USERS);

  const user = await usersCollection.findOne({ email });
  if (!user) return null;

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return null;

  return {
    ...user,
    _id: user._id.toString(),
  };
};
