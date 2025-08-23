"use client"
import React, { FormEvent, useState } from "react"
import {useSession} from "next-auth/react"
import { SpotifyResultsData, SpotifySearchType } from "@/types/json"
import PopUp from "./PopUp"

// TODO: Code comments is missing
type Props = {
    setResults: (results: SpotifyResultsData) => void
    setType: (type: SpotifySearchType) => void
}

export default function SearchOnSpotify({setResults, setType}: Props) {
	
    const {data: session} = useSession()

	const disable = session ? "cursor-grab" : "cursor-not-allowed"

    const [popUpMessage, setPopUpMessage] = useState<string | null>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!session) {
            e.preventDefault()
            setPopUpMessage("You need to log in!")
        }
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
    
            const formData = new FormData(event.currentTarget)
            const query = formData.get('query')
            const type = formData.get('type')

            if (typeof type === 'string') setType(type as SpotifySearchType)

            if (!query) {
                setPopUpMessage('No query provided')
                return
            } 
    
            const response = await fetch(`/api/apiData?query=${encodeURIComponent(query as string)}&type=${encodeURIComponent(type as string)}`)
    
            if (!response.ok) throw new Error('Failed to fetch data.')
    
            const data = await response.json()
            setResults(data)
        } catch (error) {
            console.error("Error while fetching data", error)
        } 
    }

	return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row justify-center gap-4 pb-4 pt-10 px-2 sm:px-0 w-[90%] self-center">
                <input
                    name="query"
                    type="text"
                    aria-label="Sök"
                    className="border border-(--secondary) hover:border-(--accent) rounded-2xl w-full sm:w-[50%] p-3 md:p-4 lg:p-6"
                />
                <select aria-label="Välj typ av sökning" name="type" defaultValue="artist" className={`${disable} font-bold hover:bg-(--accent) text-center sm:text-start bg-(--secondary) rounded-2xl p-3 md:p-4 lg:p-6 appearance-none bg-[url(/arrow-down.png)] bg-no-repeat bg-[right_0.3rem_center]`} >
                    <option value="artist">Artist</option>
                    <option value="track">Låt</option>
                    <option value="album">Album</option>
                    <option value="playlist">Spellista</option>
                </select>
                <button
                    type="submit"
                    className={`cursor-grab font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 rounded-2xl p-3 md:p-4 lg:p-6`}
                    onClick={handleClick}
                >
                    Sök
                </button>
            </form>
            {/* popUpMessage will not render when it's null */}
            {popUpMessage && <PopUp message={popUpMessage} onClose={() => setPopUpMessage(null)}/>}
        </>
	)
}
