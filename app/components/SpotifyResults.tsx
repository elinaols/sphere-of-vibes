import React from "react"
import ArtistCard from "./ArtistCard"
import {
	SpotifyResultsData,
	SpotifySearchType,
	SpotifyItemsTracks,
	SpotifyItemsArtists,
	SpotifyItemsPlayLists,
} from "../../types/json"

type Props = {
	// Using a built-in TS-utility to type an object with dynamic string keys and values of various types
	results: SpotifyResultsData | null
	type: SpotifySearchType
}

export default function SpotifyResults({results, type}: Props) {
	console.log("Results", results)

	// Added 's' to type for correct results mapping
	const mapType = `${type}s`

	console.log("TYPE", mapType)

	if (!results) return null

	let items: (SpotifyItemsArtists | SpotifyItemsTracks | SpotifyItemsPlayLists)[] = []

	// Sets items based on the searched type and available results
	switch (type) {
		case "artist":
			if (results && "artists" in results) {
				items = results.artists.items
			}
			break

		case "track":
			if (results && "tracks" in results) {
				items = results.tracks.items
			}
			break

		case "album":
			if (results && "albums" in results) {
				items = results.albums.items
			}
			break

		case "playlist":
			if (results && "playlists" in results) {
				items = results.playlists.items
			}
			break
	}

	// Filter out item if it's value is null
	items = items.filter((item) => item !== null)

	return items.map((item, index) => {
		console.log(item, index)
		return (
			<div key={index} className="py-10 px-50 flex w-full justify-center gap-8">
				{/** Checks every item in the ui 
                    JSON.stringify(item)*/
                }
                {type === 'artist' &&
                    <ArtistCard
                        name={item.name}
                        imageUrl={item.images && item.images.length > 0 ? item.images[0].url : "/rapper.jpg"}
                        followers={(item as SpotifyItemsArtists).followers.total}
                        genre={(item as SpotifyItemsArtists).genres[0]}
                    />
                }
                {type === 'track' &&
                    <ArtistCard
                        name={item.name}
                        imageUrl={(item as SpotifyItemsTracks).album.images && (item as SpotifyItemsTracks).album.images.length > 0 ? (item as SpotifyItemsTracks).album.images[0].url : "/rapper.jpg"}
                        date={(item as SpotifyItemsTracks).album.release_date}
                        album={(item as SpotifyItemsTracks).album.name}
                    />
                }
                {type === 'album' &&
                    <ArtistCard
                        name={item.name}
                        imageUrl={item.images && item.images.length > 0 ? item.images[0].url : "/rapper.jpg"}
                        artistName={(item as SpotifyItemsTracks).artists.name}
                        date={(item as SpotifyItemsTracks).release_date}
                    />
                }
                {type === 'playlist' &&
                    <ArtistCard
                        name={item.name}
                        imageUrl={item.images && item.images.length > 0 ? item.images[0].url : "/rapper.jpg"}
                        playlistOwner={(item as SpotifyItemsPlayLists).owner.display_name}
                        externalUrl={(item as SpotifyItemsPlayLists).external_urls.spotify}
                    />
                }
			</div>
		)
	})
}
