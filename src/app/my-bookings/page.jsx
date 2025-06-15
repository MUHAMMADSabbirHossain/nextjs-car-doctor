"use client";
import MyBookingsTable from '@/components/tables/MyBookingsTable'
import React, { useEffect, useState } from 'react'

export default function MyBookingsPages() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchMyBookings = async () => {
            const response = await fetch('http://localhost:3000/api/services');
            const data = await response.json();
            setData(data);
        }
        fetchMyBookings();
    }, []);

    return (
        <div>
            <MyBookingsTable data={data} />
        </div>
    )
}
