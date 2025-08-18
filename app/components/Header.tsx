import React from 'react'
import { Button } from './Button'

type Props = {
    size: string,
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header({size, setDarkMode, darkMode}: Props) {
    return (
        <>
        <div className='flex pt-5 px-5'>
            <h1 className={`flex-grow text-center ${darkMode ? "text-(--accent)" : "text-(--text-color)"}`}>sphere of vibes</h1>
            <div className={`justify-center ${size}`}>
                <Button setDarkMode={setDarkMode} darkMode={darkMode} />
            </div>
        </div>
        </>
    )
}