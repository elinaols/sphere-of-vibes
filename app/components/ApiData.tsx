import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import React from 'react'

export default async function ApiData(
    req: NextApiRequest, 
    res: NextApiResponse
) {
    const query = req.query?.query
    const session = await getSession({req})

    if (!session?.token?.accessToken) {
        return res.status(401).json({error: "No authenticated user"})
    }

    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&market=from_token&type=album,track,artist,playlist&limit=5`,
        {
            headers: {
                Authorization: `Bearer ${session.token.accessToken}`,
                'Content-Type': 'application/json'
            }
        }
    )

    if (!response.ok) return res.status(response.status).json({error: 'Spotify API error'})

    const results = await response.json()
    console.log(results)

    return (
        <>
            {/*posts.map((post: Post) => (
                <li className='list-none' key={post.id}>{post.name}</li>
            ))*/}
        </>
    )
}