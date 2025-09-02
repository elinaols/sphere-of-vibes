import { NextResponse } from 'next/server' // Helps with creating and returning HTTP responses
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

// TODO: Create function for refreshing access token

// Custom request handler to be able to make requests to Spotifys API
export async function GET(req: Request) {
    // Takes the request URL to get all parameters after ? 
    const {searchParams} = new URL(req.url)
    // Fetches the values for query and type
    const query = searchParams.get('query')
    const type = searchParams.get('type')

    // Gets the current user session (including accessToken)
    const session = await getServerSession(authOptions)
    console.log('Session in apiData', session)

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