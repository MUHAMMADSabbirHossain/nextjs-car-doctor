import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
    const { id } = await params;
    const bookingsCollection = dbConnect(collectionNamesObj.bookingsCollection);
    const session = await getServerSession(authOptions);

    const currentBooking = await bookingsCollection.findOne({ _id: new ObjectId(id) });

    const isOwnerOk = session?.user?.email === currentBooking?.email;

    if (isOwnerOk) {
        // delete specified booking
        const query = { _id: new ObjectId(id) };
        const deleteResponse = await bookingsCollection.deleteOne(query);
        revalidatePath("/my-bookings");

        return new Response(JSON.stringify(deleteResponse));
    } else {
        return NextResponse.json(
            {
                success: false,
                message: "Forbidden Action."
            },
            {
                status: 403
            }
        );
    }
}

export const GET = async (req, { params }) => {
    const { id } = await params;

    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);
    const data = await servicesCollection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json(data);
}