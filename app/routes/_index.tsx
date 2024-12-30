import type { MetaFunction } from "@remix-run/node";
import DividerMobile from "../../public/pattern-divider-mobile.svg"
import DividerDesktop from "../../public/pattern-divider-desktop.svg"
import Die from "../../public/icon-dice.svg"
import { useState, useEffect, Suspense } from "react";
import { useLoaderData, Await } from "@remix-run/react";
import { useRevalidator } from 'react-router-dom';
import type { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Advice Generator" },
    { name: "description", content: "Get some advice!" },
  ];
};

// export async function loader() {
//   const timer = await new Promise(resolve => setTimeout(resolve, 1000));
//   const res = await fetch("https://api.adviceslip.com/advice");
//   return await res.json();
// }

export async function loader() {
  // const timer = await new Promise(resolve => setTimeout(resolve, 1000));
  const data = await fetch("https://api.adviceslip.com/advice");
  
  return {
    slip: data.slip,
  }
}

type Slip = {
  id: number,
  advice: string
}

export default function Index() {
  const slip = useLoaderData<typeof loader>();

  const revalidator = useRevalidator();

  function getSlip() {
    revalidator.revalidate();
    console.log(slip)
  }

  return (
    <div className="min-w-screen min-h-screen">
      <div className="bg-dark-grey-blue text-center mx-4 p-7 pb-16 rounded-lg mt-[140px] md:w-[460px] md:mx-auto">
        <h1 className="text-neon-green font-extrabold text-xs tracking-widest">ADVICE #{slip.id}</h1>
        <Suspense fallback="Loading...">
          <Await resolve={slip}>
            {(slip) =>
              <p className="text-2xl text-light-cyan font-extrabold my-5">"{}"</p>
            }
          </Await>
        </Suspense>
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