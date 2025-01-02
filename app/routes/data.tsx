import type { LoaderFunctionArgs } from "@remix-run/node";

export function quickAndCritical() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("quickAndCritical");
        }, 500);
    });
}

export function slowAndDeferrable() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random());
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