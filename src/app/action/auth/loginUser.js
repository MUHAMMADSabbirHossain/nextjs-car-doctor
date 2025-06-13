"use server";

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export async function loginUser(payload) {
    const { email, password } = payload;

    const usersCollection = dbConnect(collectionNamesObj.usersCollection);

    const user = await usersCollection.findOne({ email });

    if (!user) return null;

    const isPasswordOk = await bcrypt.compare(password, user.password);

    if (!isPasswordOk) return null;

    return user;
}
