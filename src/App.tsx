import { useState } from "react";

import useLinkStore from "./link-store";

function App() {
  const { links, addLink } = useLinkStore();

  const [url, setUrl] = useState<string>("");

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const handleSubmit = () => {
    if (!url) alert("Please enter a URL");

    addLink(url);
    setUrl("");
  };

  return (
    <main className="w-screen h-screen shortener-page-bg">
      <div className="w-full h-full flex flex-col items-center p-10">
        <h1 className="text-3xl font-bold">
          Shortener <span className="text-cyan-600">URL</span>
        </h1>

        <div className="w-full max-w-lg mx-auto mt-10 p-8 border border-neutral-600 rounded-md">
          <label className="block mb-2">URL</label>
          <textarea
            className="p-2 w-full rounded-md border border-neutral-600 focus:outline-none"
            placeholder="Enter URL"
            onChange={(e) => setUrl(e.target.value)}
            rows={4}
          />

          <button
            className="p-2 w-full rounded-md border border-neutral-600 mt-4 text-cyan-500 font-bold"
            onClick={handleSubmit}>
            Shorten
          </button>
        </div>

        <div className="w-full max-w-lg mx-auto mt-10 p-8 border border-neutral-600 rounded-md">
          <h5 className="mb-4 text-center">Links</h5>

          {links.length ? (
            <ul className="w-full flex flex-col gap-2 list-disc list-inside">
              {links.map((link) => (
                <li key={link.parsedUrl} className="flex flex-row justify-between items-center gap-2">
                  <a href={`https://shortener.yudhoaerials.site/${link.parsedUrl}`} target="_blank">
                    https://shortener.yudhoaerials.site/{link.parsedUrl}
                  </a>
                  <button
                    className="text-cyan-500 hover:text-cyan-600 font-medium cursor-pointer"
                    onClick={() => copyToClipboard(`https://shortener.yudhoaerials.site/${link.parsedUrl}`)}>
                    Copy
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">No Link registered</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
