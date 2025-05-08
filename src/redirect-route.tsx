import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import useLinkStore from "./link-store";

export default function RedirectRoute() {
  const pathname = useLocation().pathname;
  const parsedUrl = pathname.slice(1);

  const { links } = useLinkStore();

  const [timer, setTimer] = useState<number>(3);

  useEffect(() => {
    const link = links.find((link) => {
      return link.parsedUrl === parsedUrl;
    });

    if (!link) return;

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);

      if (timer === 1) {
        window.location.href = link.url;
      }

      if (timer === 0) {
        setTimer(0);
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [links, parsedUrl, timer]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">
        Redirecting
        <span className="animate-pulse">...</span>
      </h1>

      <div className="w-full max-w-md mx-auto mt-10 p-8 border border-neutral-600 rounded-2xl">
        <h2 className="text-2xl font-bold">Redirecting to:</h2>
        <p className="text-lg">{links.find((link) => link.parsedUrl === parsedUrl)?.url}</p>

        <p className="text-lg">Redirecting in {timer} seconds</p>
      </div>
    </div>
  );
}
