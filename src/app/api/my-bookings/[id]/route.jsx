import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { id } = await params;
    const bookingsCollection = dbConnect(collectionNamesObj.bookingsCollection);
    const query = { _id: new ObjectId(id) };

    const session = await getServerSession(authOptions);
    const email = session.user.email;

    const singleBooking = await bookingsCollection.findOne(query);
    const isOwnerOk = email === singleBooking.email;

    if (isOwnerOk) {
        return NextResponse.json(singleBooking);
    } else {
        return NextResponse.json(
            { message: "Forbidden Read action" },
            { status: 403 }
        );
    }
};

export const PATCH = async (req, { params }) => {
    const { id } = await params;
    const bookingsCollection = dbConnect(collectionNamesObj.bookingsCollection);
    const body = await req.json();
    const query = { _id: new ObjectId(id) };
    const currentBookingData = await bookingsCollection.findOne(query)

    const session = await getServerSession(authOptions);
    const email = session.user.email;

    const filter = {
        $set: { ...body }
    }

    const option = {
        upsert: true
    };

    const isOwnerOk = email === currentBookingData.email;

    if (isOwnerOk) {
        const updateResponse = await bookingsCollection.updateOne(query, filter, option);

        revalidatePath("/my-bookings");

        return NextResponse.json(updateResponse);
    } else {
        return NextResponse.json(
            { message: "Forbidden Update action" },
            { status: 403 }
        );
    }
};
