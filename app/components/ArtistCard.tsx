import React from 'react'
import Image from 'next/image'


interface ArtistProps {
    name: string,
    /*imageURL: string,
    track: string,
    album: string*/
}

export default function ArtistCard({name}: ArtistProps) {
    return (
        <div className={`flex flex-col self-center border border-(--accent) hover:border-(--secondary) cursor-grabbing p-4 text-start rounded-2xl relative w-[140px] h-[450px] flex-1 hover:flex-[3] transition-all duration-300`}>
            <div className='z-10'>
                <p>{name}</p>
                <p>heart pt.6</p>
                <p>GNX</p>
            </div>
            <Image src="/rapper.jpg" fill className='object-cover rounded-2xl' sizes='300px' alt="Rapper on stage" />
        </div>
    )
}