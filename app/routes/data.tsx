import type { LoaderFunctionArgs } from "@remix-run/node";

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
    const slip: Slip = await slowAndDeferrable();
    return slip;
}

export type Slip = {
    id: number,
    advice: string,
}