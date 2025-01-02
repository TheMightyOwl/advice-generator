import type { MetaFunction } from "@remix-run/node";
import Die from "../../public/icon-dice.svg"
import { Suspense, useState, useEffect } from "react";
import { useLoaderData, Await, data, useFetcher, useRouteLoaderData } from "@remix-run/react";
import type { Slip } from '~/routes/data'

export const meta: MetaFunction = () => {
  return [
    { title: "Advice Generator" },
    { name: "description", content: "Get some advice!" },
  ];
};

export default function Index() {
  const [slip, setSlip] = useState<Slip>({ id: -1, advice: "" });

  const fetcher = useFetcher();

  useEffect(() => {
    reload();
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setSlip(fetcher.data as Slip);
    }
  }, [fetcher.data]);

  function reload() {
    const someData = fetcher.load("/data");
  }

  return (
    <div className="min-w-screen min-h-screen">
      <div className="bg-dark-grey-blue text-center mx-4 p-7 rounded-lg mt-[140px] md:w-[460px] md:mx-auto">
        {fetcher.state === "idle" && slip.id !== -1
          ?
          <>
            <h1 className="text-neon-green font-extrabold text-xs tracking-widest">ADVICE #{slip.id}</h1>
            <p className="text-2xl text-light-cyan font-extrabold mt-5 mb-7">{slip.advice}</p>
          </>
          :
          <>
            <div className="bg-dark-blue mb-4 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </>
        }
        <div className="divider w-full h-[20px] md:bg-[url(/public/pattern-divider-desktop.svg)] my-9"></div>
      </div>
      <div className="relative top-[-32px] w-full flex flex-row justify-center">
        <button className="hover:drop-shadow-[0_0_24px_rgba(82,255,168,0.8)] bg-neon-green rounded-full w-[58px] h-[58px]" onClick={reload}>
          <img className="mx-auto" src={Die} alt="" />
        </button>
      </div>
    </div>
  );
}