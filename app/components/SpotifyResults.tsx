import React from "react"
import ArtistCard from "./ArtistCard"
import {
	SpotifyResultsData,
	SpotifySearchType,
	SpotifyItemsTracks,
	SpotifyItemsArtists,
	SpotifyItemsPlayLists,
} from "../../types/json"
import { ArtistProps } from "@/types/artistCardProps"

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

    // TODO: Refactor to eliminate repetive code

	// Sets items based on the searched type and available results
	switch (type) {
		case "artist":
			if ("artists" in results) items = results.artists.items
			break

		case "track":
			if ("tracks" in results) items = results.tracks.items
			break

		case "album":
			if ("albums" in results) items = results.albums.items
			break

		case "playlist":
			if ("playlists" in results) items = results.playlists.items
			break
	}

	// Filter out item if it's value is null
	items = items.filter((item) => item !== null)

	return (
		<>
			{items.map((item, index) => {
				console.log(item, index)
				const props: ArtistProps = {
					name: item.name,
					imageUrl: "images" in item && item.images?.length ? item.images[0].url : "/rapper.jpg", // Checks if it's an empty array or not
					externalUrl: item.external_urls?.spotify
			}
			if ("followers" in item) {
				// Artist
				props.followers = item.followers.total
				props.genre = item.genres[0]
			} else if ("album" in item) {
				// Album/Track
				props.imageUrl = "images" in item && item.images?.length ? item.album.images[0].url : "/rapper.jpg" // Checks if it's an empty array or not
				props.album = item.album.name
				props.date = item.album.release_date
				props.artistName = item.artists.name
			} else if ("owner" in item) {
				// Playlist
				props.playlistOwner = item.owner.display_name
			}
				return <ArtistCard key={index} {...props}/>
				{/*<ArtistCard
					name={item.name}
					imageUrl={item.images && item.images.length > 0 ? imageUrl : "/rapper.jpg"}
					followers={(item as SpotifyItemsArtists).followers.total}
					genre={(item as SpotifyItemsArtists).genres[0]}
					externalUrl={(item as SpotifyItemsArtists).external_urls.spotify}
				/>*/}
			})}
			{/*{type === 'track' &&
				<ArtistCard
					name={item.name}
					imageUrl={(item as SpotifyItemsTracks).album.images && (item as SpotifyItemsTracks).album.images.length > 0 ? (item as SpotifyItemsTracks).album.images[0].url : "/rapper.jpg"}
					date={(item as SpotifyItemsTracks).album.release_date}
					album={(item as SpotifyItemsTracks).album.name}
					externalUrl={(item as SpotifyItemsTracks).external_urls.spotify}
				/>
			}
			{type === 'album' &&
				<ArtistCard
					name={item.name}
					imageUrl={item.images && item.images.length > 0 ? item.images[0].url : "/rapper.jpg"}
					artistName={(item as SpotifyItemsTracks).artists.name}
					date={(item as SpotifyItemsTracks).release_date}
					externalUrl={(item as SpotifyItemsTracks).external_urls.spotify}
				/>
			}
			{type === 'playlist' &&
				<ArtistCard
					name={item.name}
					imageUrl={item.images && item.images.length > 0 ? item.images[0].url : "/rapper.jpg"}
					playlistOwner={(item as SpotifyItemsPlayLists).owner.display_name}
					externalUrl={(item as SpotifyItemsPlayLists).external_urls.spotify}
				/>
			}*/}
		</>
	)
}
