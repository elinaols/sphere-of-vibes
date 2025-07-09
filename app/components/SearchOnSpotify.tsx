"use client"
import React, { FormEvent } from "react"
import {useSession} from "next-auth/react"

export default function SearchOnSpotify() {
	const {data: session} = useSession()

	const disable = session ? "cursor-grab" : "cursor-not-allowed"

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const query = formData.get('query')

        const response = await fetch(`/ApiData?query=${encodeURIComponent(query as string)}`)

        if (!response.ok) throw new Error('Failed to fetch data.')

        const data = await response.json()

        console.log(data)
    }

	return (
		<form onSubmit={onSubmit} className="flex justify-center gap-4 pb-4 pt-10">
			<input
				name="query"
				type="text"
				className="border border-(--secondary) hover:border-(--accent) rounded-2xl p-6 min-w-[500px]"
			/>
			<button
                type="submit"
				className={`${disable} font-bold hover:bg-(--accent) bg-(--secondary) hover:scale-102 rounded-2xl p-6`}
				disabled={!session}>
				Sök
			</button>
		</form>
	)
}
