'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function LoginStatus() {
    const { data: session } = useSession()
    
    if (session) {
        return (
            <div className='flex justify-center p-2'>
                <p>Inloggad som <span className='font-bold'>{session.user?.email}</span></p>
                <button className='font-bold px-2 border cursor-grab rounded-lg hover:bg-(--accent)' onClick={() => signOut()}>Logga ut</button>
            </div>
        )
    } else {
        return (
            <div className='flex justify-center p-2'>
                <p className='pe-3'>Inte inloggad</p>
                <button className='font-bold px-2 border cursor-grab rounded-lg hover:bg-(--accent)' onClick={() => signIn('spotify')}>Logga in med Spotify</button>
            </div>
        )
    }
}