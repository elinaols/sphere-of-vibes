"use client"
import React from "react"
import {useSession} from "next-auth/react"
import Form from "next/form"

export default function SearchOnSpotify() {
	const {data: session} = useSession()

	const disable = session ? "cursor-grab" : "cursor-not-allowed"

	return (
		<Form action={"/ApiData"} className="flex justify-center gap-4 pb-4 pt-10">
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
		</Form>
	)
}
