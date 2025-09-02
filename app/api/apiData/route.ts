import { NextResponse } from 'next/server' // Helps with creating and returning HTTP responses
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

interface SpotifyToken {
    accessToken: string
    expiresAt: number
    refreshToken: string
    error?: string
}

async function refreshAccessToken(token: SpotifyToken) {
    try {
        const url = 'https://accounts.spotify.com/api/token'
        const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken
        })
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Basic ` + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
        })

        const refreshedTokens = await response.json()
        if (!response.ok) throw refreshedTokens

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            expiresAt: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token
        }
    } catch (error) {
        console.error('Error refreshing access token:', error)
        return {
            ...token,
            error: 'RefreshAccessTokenFailed'
        }
    }
}

// Custom request handler to be able to make requests to Spotifys API
export async function GET(req: Request) {
    // Takes the request URL to get all parameters after ? 
    const {searchParams} = new URL(req.url)
    // Fetches the values for query and type
    const query = searchParams.get('query')
    const type = searchParams.get('type')

    // Gets the current user session (including accessToken)
    const session = await getServerSession(authOptions)

    // Return error if user isn't logged in or token is missing
    if (!session?.token?.accessToken) {
        return NextResponse.json({ error: "No authenticated user" }, { status: 401 })
    }

    // Calls the Spotify API with the query and type. EncodedUriComponent is used to avoid problems with special characters
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query as string)}&market=from_token&type=${encodeURIComponent(type as string)}&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${session.token.accessToken}`, // Sends the token to the API
                'Content-Type': 'application/json' 
            }
        }
    )

    // Returns error message if the API returns error
    if (!response.ok) return NextResponse.json({ error: 'Spotify API error' }, { status: response.status })

    // Parses the fetched result
    const results = await response.json()
    
    // Returns the results to the client
    return NextResponse.json(results)
}