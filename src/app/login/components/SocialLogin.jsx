"use client";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export default function SocialLogin() {
    const router = useRouter();
    const session = useSession();
    let toastId = null;

    function handleSocialLogin(providerName) {
        toastId = toast.loading(providerName + ' Loading...');

        signIn(providerName,);
    }

    useEffect(() => {
        console.log(session);
        if (session?.status == 'authenticated') {
            toast.success('Login Successfull!', {
                id: toastId,
                duration: 3000,
            });
            router.push('/');
        }
    }, [session?.status])

    return (
        <section className='flex justify-center gap-8'>
            <p
                onClick={() => handleSocialLogin('google')}
                className='bg-slate-200 rounded-full p-3'
            >
                <FaGoogle className='text-2xl' />
            </p>
            <p
                onClick={() => handleSocialLogin('github')}
                className='bg-slate-200 rounded-full p-3'
            >
                <FaGithub className='text-2xl' />
            </p>
        </section>
    )
}
