// ARTISTS

type SpotifyUrl = {
    spotify: string
}

type SpotifyFollowers = {
    href: string | null,
    total: number
}

type SpotifyImages = {
    height: number,
    url: string, 
    width: number,
}

export type SpotifyItemsArtists = {
    external_urls: SpotifyUrl,
    followers: SpotifyFollowers,
    genres: string[],
    href: string,
    id: string,
    images: SpotifyImages[],
    name: string,
    popularity: number,
    type: string,
    uri: string,
}

export type SpotifyArtists = {
    href: string,
    items: SpotifyItemsArtists[],
    limit: number,
    next: string,
    offset: number,
    //previous: null,
    total: number
}

// TRACKS

type TrackAlbum = {
    id: string,
    images: SpotifyImages[],
    name: string,
    release_date?: string,
    href: string
}

type TrackArtist = {
    href: string,
    name: string
}

export type SpotifyItemsTracks = {
    album: TrackAlbum,
    artists: TrackArtist,
    disc_number: number,
    duration_ms: number,
    explicit: false,
    external_urls: SpotifyUrl
    href: string,
    id: string,
    name: string,
    popularity: number,
    type: string,
    uri: string,
    images?: SpotifyImages[],
    release_date?: string,
}

export type SpotifyTracks = {
    href: string,
    items: SpotifyItemsTracks[],
    limit: number,
    next: string,
    offset: number,
    //previous: null,
    total: number
}

// ALBUMS

export type SpotifyAlbums = {
    href: string,
    items: SpotifyItemsTracks[],
    limit: number,
    next: string,
    offset: number,
    //previous: null,
    total: number
}

// PLAYLISTS

type SpotifyPlaylistOwner = {
    href: string
    display_name: string,
}

export type SpotifyItemsPlayLists = {
    external_urls: SpotifyUrl,
    images: SpotifyImages[],
    name: string,
    owner: SpotifyPlaylistOwner
}

export type SpotifyPlaylists = {
    href: string,
    items: SpotifyItemsPlayLists[],
    limit: number,
    next: string,
    offset: number,
    //previous: null,
    total: number
}

// EXPORT FOR ALL

export type SpotifyResultsData = 
    | {artists: SpotifyArtists}
    | {tracks: SpotifyTracks} 
    | {albums: SpotifyAlbums}  
    | {playlists: SpotifyPlaylists} 

export type SpotifySearchType = 'artist' | 'track' | 'album' | 'playlist'