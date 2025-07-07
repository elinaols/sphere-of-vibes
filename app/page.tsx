import React from "react";
import Header from "./components/Header";
import ApiData from "./components/ApiData";

export default function Home() {
  return (
    <div className="box-border w-screen h-screen p-0 m-0 bg-linear-200/shorter from-(--black) to-(--purple) flex flex-col">
      <Header size="text-lg"/>
      <main className="basis-3/4 flex justify-center text-center flex-col">
        <ApiData/>
      </main>
    </div>
  );
}
