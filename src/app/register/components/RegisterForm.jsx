"use client";
import { registerUser } from '@/app/action/auth/registerUser';
import React from 'react'

export default function RegisterForm() {

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);

        await registerUser(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder='Name' />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='Email' />
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder='Password' />
            </div>

            <button type="submit">Register</button>
        </form>
    )
}
