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
    // TODO: Fix the responsive design
    <div className={`flex flex-col bg-linear-200/shorter ${darkMode ? 'from-(--white)' : 'from-(--black)'} to-(--purple)`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} size="text-md lg:text-lg"/>
      <main className="basis-3/4 flex justify-center text-center flex-col flex-1">
        <SearchOnSpotify setResults={setResults} setType={setType}/>
        <LoginStatus darkMode={darkMode}/>
        <section className="py-10 px-10 sm:px-20 md:px-30 lg:px-50 flex justify-center flex-wrap gap-8">
          <SpotifyResults results={results} type={type}/>
        </section>
      </main>
    </div>
  );
}
