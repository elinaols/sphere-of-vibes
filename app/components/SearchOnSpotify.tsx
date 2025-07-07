'use client'
import React from 'react'

export default function SearchOnSpotify() {
    return (
        <div className='flex justify-center gap-4 pb-4'> 
            <input type="text" className='border border-(--accent) rounded-2xl p-6 min-w-[500px]'/>
            <button onClick={() => console.log('hej')} className='font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 cursor-grab rounded-2xl p-4'>Sök</button>
        </div>
    )
}
