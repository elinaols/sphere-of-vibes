import React from 'react'
import ArtistCard from './ArtistCard'
import { SpotifyResultsData, SpotifySearchType, SpotifyItemsTracks, SpotifyItemsArtists, SpotifyItemsPlayLists } from '../../types/json'

type Props = {
    // Using a built-in TS-utility to type an object with dynamic string keys and values of various types
    results: SpotifyResultsData | null,
    type: SpotifySearchType
}

export default function SpotifyResults ({results, type}: Props) {
    console.log('Results', results)

    // Added 's' to type for correct results mapping 
    const mapType = `${type}s`

    console.log('TYPE', mapType)

    if (!results) return null

    let items: (SpotifyItemsArtists | SpotifyItemsTracks | SpotifyItemsPlayLists)[] = []

    switch (type) {
        case 'artist': 
        if (results && 'artists' in results) {
                items = results.artists.items
            }
            break
            
            case 'track': 
            if (results && 'tracks' in results) {
                items = results.tracks.items
            }
            break

        case 'album': 
        if (results && 'albums' in results) {
            items = results.albums.items
        }
        break
        
        case 'playlist': 
        if (results && 'playlists' in results) {
            items = results.playlists.items
        }
        break
    }
    
    // Filter out item if it's value is null
    items = items.filter(item => item !== null)

    return (
        items.map((item, index) => {
            console.log(item, index)
            return (
                <div key={index} className="py-10 px-50 flex w-full justify-center gap-8">
                    {/** Checks every item in the ui */}
                    {JSON.stringify(item)}
                    <ArtistCard name={item.name}/>
                </div>
            )
        })
    )
}