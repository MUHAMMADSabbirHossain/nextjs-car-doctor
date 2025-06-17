import React from 'react'
import BookingUpdateForm from "@/components/forms/BookingUpdateForm";
import { headers } from 'next/headers';

export default async function UpdateBookingPage({ params }) {
    const { id } = params;

    const res = await fetch(`https://nextjs-car-doctor-teal.vercel.app/api/my-bookings/${id}`, {
        headers: new Headers(headers())
    });
    const data = await res.json();
    // console.log(data);

    return (
        <div>
            <BookingUpdateForm data={data} />
        </div>
    )
}
