/*
import React from 'react'
type Post = {
    name: string,
    id?: number,
    menu: Array<string>
}

export default async function ApiData() {
    const data = await fetch('https://webbkurs.ei.hv.se/~elol0031/JSR200/Checkpoint_2/restaurants.json')
    const posts = await data.json()

    return (
        <>
            {posts.map((post: Post) => (
                <li className='list-none' key={post.id}>{post.name}</li>
            ))}
        </>
    )
}*/