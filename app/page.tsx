'use client'
import React, { useState } from "react";
import Header from "./components/Header";
import LoginStatus from "./components/LoginStatus";
import SearchOnSpotify from "./components/SearchOnSpotify";
import SpotifyResults from "./components/SpotifyResults";
import { SpotifyResultsData, SpotifySearchType } from "@/types/json";

export default function Home() {
  const [results, setResults] = useState<SpotifyResultsData | null>(null)
  const [type, setType] = useState<SpotifySearchType>('artist')
  const [darkMode, setDarkMode] = useState(false)

  return (
    // from-(--white) används när knappen om mörkt/ljust läge har togglats
    <div className={`box-border min-h-screen p-0 m-0  flex flex-col bg-linear-200/shorter ${darkMode ? 'from-(--black)' : 'from-(--white)'} to-(--purple)`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} size="text-lg"/>
      <main className="basis-3/4 flex justify-center text-center flex-col">
        <SearchOnSpotify setResults={setResults} setType={setType}/>
        <LoginStatus/>
        <section className="py-10 px-50 flex w-full justify-center gap-8">
          <SpotifyResults results={results} type={type}/>
        </section>
      </main>
    </div>
  );
}
