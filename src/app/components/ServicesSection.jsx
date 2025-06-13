import dbConnect, { collectionNamesObj } from '@/lib/dbConnect';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaArrowRight } from "react-icons/fa";

export default async function ServicesSection() {
    const serviceCollection = dbConnect(collectionNamesObj.servicesCollection);
    // console.log(serviceCollection);

    const data = await serviceCollection.find({}).toArray();

    return (
        <div className='grid grid-cols-12'>
            {data.map((item) => {
                return (
                    <div
                        key={item._id}
                        className='col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border'>
                        <figure className='w-full h-3/4 flex justify-center items-center'>
                            <Image
                                src={item.img}
                                alt={item.title}
                                width={314}
                                height={208}
                            />
                        </figure>
                        <div className=' flex justify-between items-center mt-4'>
                            <div>
                                <h2 className='fonbold text-xl'>{item.title}</h2>
                                <p className='fontbold text-xl text-orange-500'>
                                    Price: ${item.price}
                                </p>
                            </div>
                            <div>
                                <Link
                                    href={`/services/${item._id}`}
                                    className='text-orange-500'>
                                    <FaArrowRight />
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
