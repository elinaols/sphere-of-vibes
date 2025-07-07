import React from 'react'
import { Button } from './Button'

type Props = {
    size: string
}

export default function Header({size}: Props) {
    return (
        <>
        <div className='flex pt-5 px-5'>
            <h1 className='flex-grow text-center'>sphere of vibes</h1>
            <div className={`justify-center ${size}`}>
                <Button/>
            </div>
        </div>
        </>
    )
}