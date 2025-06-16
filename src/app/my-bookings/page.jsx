import MyBookingsTable from '@/components/tables/MyBookingsTable'
import { headers } from 'next/headers';
import React from 'react'

const fetchMyBookings = async () => {
    const response = await fetch('http://localhost:3000/api/services', {
        headers: new headers(),
    });
    const data = await response.json({});
    return data;
}

export default async function MyBookingsPages() {
    const data = await fetchMyBookings();

    return (
        <div>
            <MyBookingsTable data={data} />
        </div>
    )
}
