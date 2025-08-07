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

  return (
    <div className="box-border min-h-screen p-0 m-0 bg-linear-200/shorter from-(--black) to-(--purple) flex flex-col">
      <Header size="text-lg"/>
      <main className="basis-3/4 flex justify-center text-center flex-col">
        <SearchOnSpotify setResults={setResults} setType={setType}/>
        <LoginStatus/>
        <section className="flex flex-col">
          <SpotifyResults results={results} type={type}/>
        </section>
      </main>
    </div>
  );
}
