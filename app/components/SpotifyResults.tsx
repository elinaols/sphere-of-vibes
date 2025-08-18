import React from "react"
import ArtistCard from "./ArtistCard"
import {
	SpotifyResultsData,
	SpotifySearchType,
	SpotifyItemsTracks,
	SpotifyItemsArtists,
	SpotifyItemsPlayLists,
} from "../../types/json"
import {ArtistProps} from "@/types/artistCardProps"

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
					// Determines the correct image based on the item type
					imageUrl:
						"images" in item && item.images?.length
							? item.images[0].url
							: "album" in item && item.album?.images?.length
							? item.album?.images[0].url
							: "/rapper.jpg", // Checks if it's an empty array or not
					externalUrl: item.external_urls?.spotify,
				}

				// Adding extra props depending on the item type
				if (type === 'artist') {
					// Artist
					const artistItem = item as SpotifyItemsArtists
					props.followers = artistItem.followers.total
					props.genre = "genres" in item ? item.genres[0] : "Unknown genre"
				} else if (type === "album" && "release_date" in item) {
					// Album/Track
					props.album = item.album.name
					props.date = item.release_date
					props.artistName = item.artists.name
				} else if (type === "track" && "album" in item && "release_date" in item.album) {
					// Track
					props.date = item.album.release_date
				} else if ("owner" in item) {
					// Playlist
					props.playlistOwner = item.owner.display_name
				}

				// Spreads the props so ArtistCard can recieve all necessary props
				return <ArtistCard key={index} {...props} />
			})}
		</>
	)
}
