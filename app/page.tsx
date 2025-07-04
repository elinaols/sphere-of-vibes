import React from "react";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="box-border w-screen h-screen p-0 m-0 bg-linear-200/shorter from-(--black) to-(--purple)">
      <Header size="text-lg"/>
      <main className="text-center">
        <p>hej</p>
      </main>
    </div>
  );
}
