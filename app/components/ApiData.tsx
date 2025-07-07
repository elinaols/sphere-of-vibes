import React from 'react'

type Post = {
    name: string,
    id: number,
    openingHours: any,
    michelinStar: any,
    menu: Array<string>
}

export default async function ApiData() {
    let data = await fetch('https://webbkurs.ei.hv.se/~elol0031/JSR200/Checkpoint_2/restaurants.json')
    let posts = await data.json()

    return (
        <>
            {posts.map((post: Post) => (
                <li className='list-none' key={post.id}>{post.name}</li>
            ))}
        </>
    )
}