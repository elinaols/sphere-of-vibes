import React from "react";
import Header from "./components/Header";
import LoginStatus from "./components/LoginStatus";
import SearchOnSpotify from "./components/SearchOnSpotify";
import ArtistCard from "./components/ArtistCard";

export default function Home() {
  return (
    <div className="box-border min-h-screen p-0 m-0 bg-linear-200/shorter from-(--black) to-(--purple) flex flex-col">
      <Header size="text-lg"/>
      <main className="basis-3/4 flex justify-center text-center flex-col">
        <SearchOnSpotify/>
        <LoginStatus/>
        <div className="py-10 px-50 flex w-full justify-center gap-8">
          <ArtistCard/>
          <ArtistCard/>
          <ArtistCard/>
          <ArtistCard/>
          <ArtistCard/>
        </div>
      </main>
    </div>
  );
}
