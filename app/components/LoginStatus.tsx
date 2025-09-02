'use client'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

type Props = {
    darkMode: boolean
}

export default function LoginStatus({darkMode}: Props) {
    const { data: session } = useSession()
    
    if (session) {
        return (
            <div className={`flex flex-col sm:flex-row justify-center p-2 ${darkMode ? 'text-(--accent)' : 'text-(--text-color)'}`}>
                <p className='pe-3 pb-2 sm:pb-0'>Inloggad som <span className='font-bold'>{session.user?.email}</span></p>
                <button className='self-center font-bold px-2 border cursor-grab rounded-lg hover:bg-(--accent)' onClick={() => signOut()}>Logga ut</button>
            </div>
        )
    } else {
        return (
            <div className={`flex flex-col sm:flex-row justify-center p-2 ${darkMode ? 'text-(--accent)' : 'text-(--text-color)'}`}>
                <p className='pe-3 pb-2 sm:pb-0'>Inte inloggad</p>
                <button className='self-center font-bold px-2 border cursor-grab rounded-lg hover:bg-(--accent)' onClick={() => signIn('spotify')}>Logga in med Spotify</button>
            </div>
        )
    }
}