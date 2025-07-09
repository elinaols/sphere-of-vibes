import { NextResponse, NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export default async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const query = searchParams.get('query') ?? ''

    const session = await getServerSession(authOptions)

    if (!session?.token?.accessToken) {
        return NextResponse.json({error: "No authenticated user"}, {status: 401})
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&market=from_token&type=album,track,artist,playlist&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${session.token.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )

    if (!response.ok) return NextResponse.json({error: 'Spotify API error'}, {status: response.status})

    const results = await response.json()
    
    return NextResponse.json(results)
}

/*
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function apiData(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const query = req.query?.query

    const session = await getSession({req})

    if (!session?.token?.accessToken) {
        return res.status(401).json({error: "No authenticated user"})
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query as string)}&market=from_token&type=album,track,artist,playlist&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${session.token.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )

    if (!response.ok) return res.status(response.status).json({error: 'Spotify API error'})

    const results = await response.json()
    
    return res.status(response.status).json(results)
}
*/