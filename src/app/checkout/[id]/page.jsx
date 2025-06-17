import CheckoutForm from '@/components/forms/CheckoutForm';
import React from 'react'

export default async function CheckoutPage({ params }) {
    const { id } = await params;

    const res = await fetch(`https://nextjs-car-doctor-teal.vercel.app/api/services/${id}`);
    const data = await res.json();

    return (
        <div>
            <CheckoutForm data={data} />
        </div>
    )
}
