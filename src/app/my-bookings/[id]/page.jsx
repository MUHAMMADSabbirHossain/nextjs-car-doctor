import React from 'react'
import BookingUpdateForm from "@/components/forms/BookingUpdateForm";
import { headers } from 'next/headers';

export default async function UpdateBookingPage({ params }) {
    const { id } = params;

    const res = await fetch(`http://localhost:3000/api/my-bookings/${id}`, {
        headers: await headers(),
    });
    const data = await res.json();
    // console.log(data);

    return (
        <div>
            <BookingUpdateForm data={data} />
        </div>
    )
}
