import React from 'react'
import Image from 'next/image'
import { ArtistProps } from '@/types/artistCardProps'

export default function ArtistCard({name, imageUrl, followers, genre, date, album, artistName, playlistOwner, externalUrl}: ArtistProps) {
    const capatilize = (str: string): string => 
        str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    
    return (
        <div className={`flex flex-col self-center border border-(--accent) hover:border-(--secondary) cursor-grabbing p-4 text-start rounded-2xl relative w-[140px] h-[450px] flex-1 hover:flex-[3] transition-all duration-300`}>
            <div className='z-10 bg-[#532ec5]/30 backdrop-invert backdrop-opacity-10 rounded-2xl p-2'>
                <p>{name}</p>
                <p>{`${followers ?? 'Unknown amount of'} listeners`}</p>
                <p>{capatilize(genre ?? '')}</p>
                <p>{date}</p>
                <p>{album}</p>
                <p>{artistName}</p>
                <p>{playlistOwner}</p>
                <a className='font-bold' href={externalUrl} target='_blank'>Press to see more</a>
            </div>
            {/* Change: use <img> instead of <Image> to support fallback if imageUrl fails to load (onError) */}
            <Image src={imageUrl ?? '/rapper.jpg'} fill className='object-cover rounded-2xl' sizes='300px' alt="Rapper on stage" />
        </div>
    )
}