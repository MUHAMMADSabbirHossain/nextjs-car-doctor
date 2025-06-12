"use server";

import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export async function registerUser(payload) {
    console.log(payload);

    const usersCollection = dbConnect(collectionNamesObj.usersCollection);

    // Validation
    const { name, email, password } = payload;
    if (!name || !email || !password) {
        return { error: "All fields are required" };
    }

    const user = await usersCollection.findOne({ email: payload.email });

    if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);

        payload.password = hashedPassword;
        const result = await usersCollection.insertOne(payload);
        const { acknowledged, insertedId } = result;
        return { acknowledged, insertedId };
    }

    return { error: "User already exists" };
}
