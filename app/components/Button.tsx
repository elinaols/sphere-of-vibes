'use client'
import React, {useState} from 'react'

export const Button = () => {
    const [darkMode, setDarkMode] = useState<boolean>(false)

    return (
        // onClick: Toggles the state value based on the previous state value. If true, the opposite (false) will be set as the new value (and vice versa)
        <button 
            className='py-2 px-3 bg-(--accent) rounded-2xl hover:bg-(--secondary) cursor-grab hover:zoom hover:scale-102 hover:ease-in-out'
            onClick={() => setDarkMode(prev => !prev)}
        >
            {darkMode ? 'Dark mode' : 'Light mode'}
        </button>
    )
}