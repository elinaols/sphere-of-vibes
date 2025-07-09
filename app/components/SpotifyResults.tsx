import React from 'react'
import ArtistCard from './ArtistCard'
import { Json } from '@/types/json'

type Props = {
    // Using a built-in TS-utility to type an object with dynamic string keys and values of various types
    results: Json
}

export default function SpotifyResults (results: Props) {
    console.log('DATAAAAAAAAA', results)
    return (
        <div className="py-10 px-50 flex w-full justify-center gap-8">
            <ArtistCard/>
        </div>
    )
}