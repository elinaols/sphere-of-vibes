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
        <div className='flex flex-col-reverse sm:flex-row p-3 lg:p-4'>
            <h1 className={`font-semibold flex-grow italic text-5xl sm:text-6xl md:text-[75px] lg:text-[100px] xl:text-9xl text-center ${darkMode ? "text-(--accent)" : "text-(--text-color)"}`}>sphere of vibes</h1>
            <div className={`self-end sm:self-start pb-4 sm:pb-0 sm:justify-center ${size}`}>
                <Button setDarkMode={setDarkMode} darkMode={darkMode} />
            </div>
        </div>
        </>
    )
}