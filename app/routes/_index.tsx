import type { MetaFunction } from "@remix-run/node";
import DividerMobile from "../../public/pattern-divider-mobile.svg"
import DividerDesktop from "../../public/pattern-divider-desktop.svg"
import Die from "../../public/icon-dice.svg"
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Advice Generator" },
    { name: "description", content: "Get some advice!" },
  ];
};

type Slip = {
  id: number,
  advice: string
}

export default function Index() {

  const [slip, setSlip] = useState<Slip>({id: 0, advice: ""});

  useEffect(() => {
    getSlip();
  }, []);

  async function getSlip() {
    const res = await fetch("https://api.adviceslip.com/advice", {cache: "no-store"});
    const data = await res.json();
    setSlip(data.slip);
  }

  return (
    <div className="min-w-screen min-h-screen">
      <div className="bg-dark-grey-blue text-center mx-4 p-7 pb-16 rounded-lg mt-[140px]">
        <h1 className="text-neon-green font-extrabold text-xs tracking-widest">ADVICE #{slip.id}</h1>
        <p className="text-2xl text-light-cyan font-extrabold my-5">"{slip.advice}"</p>
        <div className="divider w-full h-[20px]"></div>
      </div>
      <div className="relative top-[-32px] w-full flex flex-row justify-center">
        <button className="bg-neon-green rounded-full w-[64px] h-[64px]" onClick={getSlip}>
          <img className="mx-auto" src={Die} alt="" />
        </button>
      </div>
    </div>
  );
}