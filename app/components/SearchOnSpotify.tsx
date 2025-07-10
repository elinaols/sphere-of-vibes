"use client"
import React, { FormEvent } from "react"
import {useSession} from "next-auth/react"
import { Json } from "@/types/json"

type Props = {
    setResults: (results: Json) => void
}

export default function SearchOnSpotify({setResults}: Props) {
	const {data: session} = useSession()

	const disable = session ? "cursor-grab" : "cursor-not-allowed"

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault()
    
            const formData = new FormData(event.currentTarget)
            const query = formData.get('query')
            const type = formData.get('type')

            if (!query) return console.log("No query provided")
    
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
            <form onSubmit={onSubmit} className="flex justify-center gap-4 pb-4 pt-10">
                <input
                    name="query"
                    type="text"
                    className="border border-(--secondary) hover:border-(--accent) rounded-2xl p-6 min-w-[500px]"
                />
                <select name="type" defaultValue="artist" className={`${disable} font-bold hover:bg-(--accent) bg-(--secondary) rounded-2xl p-6 appearance-none bg-[url(/arrow-down.png)] bg-no-repeat bg-[right_0.7rem_center]`} disabled={!session}>
                    <option value="artist">Artist</option>
                    <option value="track">Låt</option>
                    <option value="album">Album</option>
                    <option value="playlist">Spellista</option>
                </select>
                <button
                    type="submit"
                    className={`${disable} font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 rounded-2xl p-6`}
                    disabled={!session}>
                    Sök
                </button>
            </form>
        </>
	)
}
