import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function ApiData(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const query = req.query?.query

    if (!query || Array.isArray(query)) return res.status(400).json({ error: 'Invalid or missing query parameter' })

    const session = await getSession({req})

    if (!session?.token?.accessToken) {
        return res.status(401).json({error: "No authenticated user"})
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&market=from_token&type=album,track,artist,playlist&limit=5`,
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