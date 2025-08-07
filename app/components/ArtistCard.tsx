import React from 'react'

interface ArtistProps {
    name: string,
    imageUrl: string,
    followers?: number,
    genre?: string,
    date?: string,
    album?: string,
    artistName?: string,
    playlistOwner?: string,
    externalUrl?: string,
}

export default function ArtistCard({name, imageUrl, followers, genre, date, album, artistName, playlistOwner, externalUrl}: ArtistProps) {
    const capatilize = (str: string): string => 
        str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
    
    return (
        <div className={`flex flex-col self-center border border-(--accent) hover:border-(--secondary) cursor-grabbing p-4 text-start rounded-2xl relative w-[140px] h-[450px] flex-1 hover:flex-[3] transition-all duration-300`}>
            <div className='z-10'>
                <p>{name}</p>
                <p>{`${followers ?? 'Unknown amount of'} listeners`}</p>
                <p>{capatilize(genre ?? '')}</p>
                <p>{date}</p>
                <p>{album}</p>
                <p>{artistName}</p>
                <p>{playlistOwner}</p>
                <a className='font-bold' href={externalUrl} target='_blank'>Press to see playlist</a>
            </div>
                <div className='relative w-[300px] h-[300px] rounded-2xl overflow-hidden'>
                    <img src={imageUrl} alt="Picture of the artists album" onError={e => e.currentTarget.src = '/rapper.jpg'} className='absolute inset-0 w-full h-full object-cover rounded-2xl'/>
                </div>
        </div>
    )
}