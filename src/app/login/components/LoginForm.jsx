"use client";
import React from 'react'
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import SocialLogin from './SocialLogin';

export default function LoginForm() {
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);

        toast("Logging in...")

        try {
            const response = await signIn("credentials", { ...data, callbackUrl: "/", redirect: false });
            console.log(response);

            if (response.ok) {
                toast.success("Login successful!");
                router.push(response.url);
                e.target.reset();

            } else {
                toast.error("Login failed!");
            }
        } catch (error) {
            console.log(error);
            alert("Login authentication failed!");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
            <label className="form-control w-full">
                <div className="label w-full">
                    <span className="label-text  font-bold">Email</span>
                </div>
                <input
                    type="text"
                    name="email"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                />
            </label>
            <label className="form-control w-full">
                <div className="label w-full">
                    <span className="label-text font-bold">Password</span>
                </div>
                <input
                    type="password"
                    name="password"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                />
            </label>
            <button className="w-full h-12 bg-orange-500 text-white font-bold">
                Sign In
            </button>

            <p className="text-center">Or Sign In with</p>
            <SocialLogin />
            <p className="text-center">
                Already have an account?{" "}
                <Link href="/register" className="text-orange-500 font-bold">
                    Register
                </Link>
            </p>
        </form>
    )
}
