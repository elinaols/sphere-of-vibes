'use client'
import React, { useState } from "react";
import Header from "./components/Header";
import LoginStatus from "./components/LoginStatus";
import SearchOnSpotify from "./components/SearchOnSpotify";
import SpotifyResults from "./components/SpotifyResults";
import { Json } from "@/types/json";

export default function Home() {
  const [results, setResults] = useState<Json | null>(null)
  const [type, setType] = useState<string>('artist')

  return (
    <div className="box-border min-h-screen p-0 m-0 bg-linear-200/shorter from-(--black) to-(--purple) flex flex-col">
      <Header size="text-lg"/>
      <main className="basis-3/4 flex justify-center text-center flex-col">
        <SearchOnSpotify setResults={setResults} setType={setType}/>
        <LoginStatus/>
        <SpotifyResults results={results} type={type}/>
      </main>
    </div>
  );
}
