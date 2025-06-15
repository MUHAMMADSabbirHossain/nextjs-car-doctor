import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {

    const body = await req.json();
    console.log(body);

    const bookingsCollection = dbConnect(collectionNamesObj.bookingsCollection);
    const result = await bookingsCollection.insertOne(body);

    return NextResponse.json({ result });
}