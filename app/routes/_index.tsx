import type { MetaFunction } from "@remix-run/node";
import Die from "../../public/icon-dice.svg"
import { Suspense, useState } from "react";
import { useLoaderData, Await, data, useFetcher } from "@remix-run/react";
import { useRevalidator } from 'react-router-dom';
import type { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Advice Generator" },
    { name: "description", content: "Get some advice!" },
  ];
};

export async function slowAndDeferrable() {
  const data = await fetch("https://api.adviceslip.com/advice");
  const res = await data.json();
  const slip: Slip = res.slip;
  const promise: Promise<Slip> = new Promise((resolve) => {
    setTimeout(() => {
      resolve(slip);
    }, 1200);
  });
  return promise;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const data = slowAndDeferrable();
  console.log(data);
  return { data };
}

type Slip = {
  id: number,
  advice: string,
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const revalidator = useRevalidator();

  return (
    <div className="min-w-screen min-h-screen">
      <div className="bg-dark-grey-blue text-center mx-4 p-7 pb-16 rounded-lg mt-[140px] md:w-[460px] md:mx-auto">
        <Suspense fallback={<p>loading...</p>}>
          <Await resolve={data}>
            {(res) => {
              const id = res.id;
              const advice = res.advice;
              return (
                <>
                  <h1 className="text-neon-green font-extrabold text-xs tracking-widest">ADVICE #{id}</h1>
                  <p className="text-2xl text-light-cyan font-extrabold my-5">{advice}</p>
                </>
              )
            }}
          </Await>
        </Suspense>
        <div className="divider w-full h-[20px]"></div>
      </div>
      <div className="relative top-[-32px] w-full flex flex-row justify-center">
        <button className="bg-neon-green rounded-full w-[64px] h-[64px]" onClick={revalidator.revalidate}>
          <img className="mx-auto" src={Die} alt="" />
        </button>
      </div>
    </div>
  );
}