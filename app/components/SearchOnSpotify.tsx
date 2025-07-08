'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

export default function SearchOnSpotify() {
    const { data: session } = useSession()

    const disable = session ? 'cursor-grab' : 'cursor-not-allowed'
    
        return (
        <div className='flex justify-center gap-4 pb-4 pt-10'> 
            <input type="text" className='border border-(--secondary) hover:border-(--accent) rounded-2xl p-6 min-w-[500px]'/>
            <button 
                className={`${disable} font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 rounded-2xl p-6`}
                disabled={!session}
                >
                    Sök
            </button>
        </div>
    )
}
