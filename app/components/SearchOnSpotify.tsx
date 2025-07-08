'use client'
import React, {useState} from 'react'

export default function SearchOnSpotify() {
    const [disable, setDisable] = useState<boolean>(false)
    
        return (
        <div className='flex justify-center gap-4 pb-4'> 
            <input type="text" className='border border-(--accent) rounded-2xl p-6 min-w-[500px]'/>
            <button onClick={() => setDisable(prev => !prev)} className={`${disable ? 'cursor-not-allowed' : 'cursor-grab'} font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 rounded-2xl p-4`}>Sök</button>
        </div>
    )
}
