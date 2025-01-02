import type { MetaFunction } from "@remix-run/node";
import Die from "../../public/icon-dice.svg"
import { Suspense, useState, useEffect } from "react";
import { useLoaderData, Await, data, useFetcher, Link } from "@remix-run/react";
import { useNavigate, useRevalidator } from 'react-router-dom';
import type { LoaderFunctionArgs } from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        { title: "Advice Generator" },
        { name: "description", content: "Get some advice!" },
    ];
};

export function quickAndCritical() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("quickAndCritical");
        }, 500);
    });
}

export async function slowAndDeferrable() {
    const data = await fetch("https://api.adviceslip.com/advice");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 2000);
    });
}

export async function loader({ request }: LoaderFunctionArgs) {
    // const critical = await quickAndCritical();
    const data = await slowAndDeferrable();

    return {
        data
    }
}

type Data = {
    data: string,
}

type Slip = {
    slip: {
        id: number,
        advice: string,
    }
}

export default function Test() {
    //   const apiData = useLoaderData<typeof loader>();
    const revalidator = useRevalidator();
    const fetcher = useFetcher();

    const { data } = useLoaderData<typeof loader>();

    const [value, setValue] = useState<Slip>({slip: {id: -1, advice: ""}});

    const navigate = useNavigate();

    useEffect(() => {
        console.log(data);
        reload();
    }, []);

    useEffect(() => {
        if (fetcher.data) {
            setValue(fetcher.data as Slip);
            console.log(fetcher.data);
        }
    }, [fetcher.data]);

    function reload() {
        // navigate(".", { replace: true })
        const someData = fetcher.load("");
    }

    return (
        <>
            <div>
                <br></br>
                <br></br>
                {/* <p className="text-light-cyan">{fetcher.state === "idle" ? value.slip.advice : `Loading...`}</p> */}
                <button className="mt-6 bg-neon-green rounded-full w-[64px] h-[64px]" onClick={reload}>
                    Reload
                </button>
                <Link to="/test">Reload</Link>
            </div>
        </>
    );
}