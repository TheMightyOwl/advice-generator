import { useLoaderData, Await, defer } from "@remix-run/react";
import { Suspense } from "react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { quickAndCritical } from "./test";

export function quickAndCritical() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("quickAndCritical");
      }, 1000);
    });
  }

export function slowAndDeferrable() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("slow");
      }, 3000);
    });
  }
  
export async function loader({ request }: LoaderFunctionArgs) {
    const critical = await quickAndCritical();
    const canBeDeferred = slowAndDeferrable();
  
    return {
        critical,
        canBeDeferred,
    }
}

export default function AwaitTest() {
    const {critical, canBeDeferred} = useLoaderData<typeof loader>();

    return (
        <>
            <p className="text-light-cyan">This is some text...</p>
            <Suspense fallback={<p>Loading...</p>} key="somekey">
                <Await resolve={canBeDeferred}>
                    {(res) => <p className="text-light-cyan">{res}</p>}
                </Await>
            </Suspense>
        </>
    )
}