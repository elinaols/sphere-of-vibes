"use client"
import React, {FormEvent, useState} from "react"
import {useSession} from "next-auth/react"
import {SpotifyResultsData, SpotifySearchType} from "@/types/json"
import PopUp from "./PopUp"

// TODO: Code comments is missing
type Props = {
	setResults: (results: SpotifyResultsData) => void
	setType: (type: SpotifySearchType) => void
}

export default function SearchOnSpotify({setResults, setType}: Props) {
    const [inputValue, setInputValue] = useState('')
	const {data: session} = useSession()

	const disable = session?.accessToken ? "cursor-grab" : "cursor-not-allowed"

	const [popUpMessage, setPopUpMessage] = useState<string | null>(null)

	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!session?.accessToken) {
			e.preventDefault()
			setPopUpMessage("Logga in först!")
		}
	}

	console.log("Access token: ", session?.accessToken)
	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!session?.accessToken) {
			setPopUpMessage("Logga in först!")
			return
		}

		const formData = new FormData(event.currentTarget)
		const query = formData.get("query")
		const type = formData.get("type")

		if (typeof type === "string") setType(type as SpotifySearchType)

		if (!query) {
			setPopUpMessage("Fyll i sökfältet")
			return
		}

		try {	
			const response = await fetch(
				`/api/apiData?query=${encodeURIComponent(query as string)}&type=${encodeURIComponent(type as string)}`,
				{
					headers: {
						Authorization: `Bearer ${session?.accessToken}`
					}
				}
			)
			console.log("Response status: ", response.status, response.statusText)
			if (!response.ok) throw new Error("Failed to fetch data.")

			const data = await response.json()
			setResults(data)
		} catch (error) {
			console.error("Error while fetching data", error)
		} finally {
            setInputValue('')
        }
	}

	return (
		<>
			<form
				onSubmit={onSubmit}
				className="flex flex-col sm:flex-row justify-center gap-4 pb-4 pt-10 px-2 sm:px-0 w-[90%] self-center">
				<input
					name="query"
					type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
					aria-label="Sök"
					className="border border-(--secondary) hover:border-(--accent) rounded-2xl w-full sm:w-[50%] p-3 md:p-4 lg:p-6"
				/>
				<select
					aria-label="Välj typ av sökning"
					name="type"
					defaultValue="artist"
					className={`${disable} text-(--text-color) font-bold hover:bg-(--accent) text-center sm:text-start bg-(--secondary) rounded-2xl p-3 md:p-4 lg:p-6 appearance-none bg-[url(/arrow-down.png)] bg-no-repeat bg-[right_0.3rem_center]`}>
					<option value="artist">Artist</option>
					<option value="track">Låt</option>
					<option value="album">Album</option>
					<option value="playlist">Spellista</option>
				</select>
				<button
					type="submit"
					className={`${disable} text-(--text-color) cursor-grab font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 rounded-2xl p-3 md:p-4 lg:p-6`}
					onClick={handleClick}>
					Sök
				</button>
			</form>
			{/* popUpMessage will not render when it's null */}
			{popUpMessage && <PopUp message={popUpMessage} onClose={() => setPopUpMessage(null)} />}
		</>
	)
}
