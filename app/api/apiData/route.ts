import { NextResponse } from 'next/server' // Helps with creating and returning HTTP responses
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

// TODO: Create function for refreshing access token
// https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens


    interface SpotifyToken {
        accessToken: string
        refreshToken: string
        expiresAt: number
        error?: string
    }

    async function refreshAccessToken(token: SpotifyToken) {
        try {
            const body = new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: token.refreshToken
            })

            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body.toString()
            })

            const data = await response.json()

            if (!response.ok) throw data

            return {
                ...token,
                accessToken: data.access_token,
                refreshToken: data.refresh_token ?? token.refreshToken,
                expiresAt: Date.now() + data.expires_in * 1000
            }
        } catch (error) {
            console.error('Error refreshing access token:', error)
            return {...token, error: 'Failed to refresh access token'}
        }
    }


// Custom request handler to be able to make requests to Spotifys API
export async function GET(req: Request) {
    

    // Gets the current user session (including accessToken)
    const session = await getServerSession(authOptions)

    // Return error if user isn't logged in or token is missing
    if (!session?.token?.accessToken) {
        return NextResponse.json({ error: "No authenticated user" }, { status: 401 })
    }

    
        const token: SpotifyToken = {
            accessToken: session.token.accessToken,
            refreshToken: session.token.refreshToken,
            expiresAt: session.token.expiresAt ?? 0
        }

        const refreshedToken = await refreshAccessToken(token)

        if (refreshedToken.error) {
            return NextResponse.json({ error: refreshedToken.error }, { status: 401 })
        }

        return NextResponse.json({
            accessToken: refreshedToken.accessToken,
            refreshToken: refreshedToken.refreshToken,
            expiresAt: refreshedToken.expiresAt
        })
    
/*
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
    return NextResponse.json(results)*/
}