import React from 'react'
import ArtistCard from './ArtistCard'

type Props = {
    // Using a built-in TS-utility to type an object with dynamic string keys and values of various types
    results: {
        [key: string]: {
            items: any[]
        }
    },
    type: string
}

export default function SpotifyResults ({results, type}: Props) {
    console.log('Results', results)

    // Added 's' to type for correct results mapping 
    const mapType = `${type}s`

    console.log('TYPE', mapType)

    if (!results) return null

    const items = results[mapType].items

    {
        items.map((item, index) => {
            console.log(item, index)
            return (
                <div key={index} className="py-10 px-50 flex w-full justify-center gap-8">
                    {JSON.stringify(item)}
                    <ArtistCard/>
                </div>
            )})
}}