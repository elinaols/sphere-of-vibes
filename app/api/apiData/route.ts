import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

// Custom request handler to be able to make requests to Spotifys API
export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const query = searchParams.get('query')
    const type = searchParams.get('type')

    const session = await getServerSession(authOptions)

    if (!session?.token?.accessToken) {
        return NextResponse.json({ error: "No authenticated user" }, { status: 401 })
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query as string)}&market=from_token&type=${encodeURIComponent(type as string)}&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${session.token.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )

    if (!response.ok) return NextResponse.json({ error: 'Spotify API error' }, { status: response.status })

    const results = await response.json()
    
    return NextResponse.json(results)
}