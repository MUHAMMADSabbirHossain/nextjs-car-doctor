import dbConnect, { collectionNamesObj } from '@/lib/dbConnect';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import React from 'react'

export default async function ServiceDetailsPage({ params }) {
    const { id } = await params;

    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);
    const data = await servicesCollection.findOne({ _id: new ObjectId(id) });

    return (
        <div>
            <section className='flex justify-center '>
                <figure className='relative'>
                    <Image
                        src={"/assets/images/checkout/checkout.png"}
                        alt="Banner"
                        width={1137}
                        height={300}
                    />
                    <div className='transparent-layer overlay-bg  absolute w-full h-full top-0 border-2 border-red-400'>
                        <div className='w-full h-full font-bold text-2xl flex items-center ps-16'>
                            <div>
                                <h1 className='text-white'>Service Details</h1>

                            </div>
                        </div>
                    </div>
                </figure>
            </section>

            <section>
                <Image
                    src={data?.img}
                    alt="Service Image"
                    width={500}
                    height={500}
                />
                <h1 className='text-3xl font-bold'>{data?.title}</h1>
            </section>
            ServiceDetails: {id}
            <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}
