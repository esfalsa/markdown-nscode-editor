"use client";

import { useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkStringifyNSCode, { allChildren } from "remark-stringify-nscode";

export default function Home() {
  const [markdown, setMarkdown] = useState("");

  const file = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkStringifyNSCode, {
      handlers: {
        heading: (node) =>
          allChildren(node, {
            before: `[b][size=${(7 - node.depth) * 30}]`,
            after: "[/size][/b]",
          }),
      },
    })
    .processSync(markdown);

  const nscode = String(file);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-16">
      <div className="flex h-full w-full flex-1 flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
        <div className="flex flex-1 flex-col">
          <h2 className="text-xl font-bold">Markdown</h2>
          <textarea
            name="markdown"
            id="markdown"
            className="flex-1 rounded-md border px-1 py-0.5 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <h2 className="text-xl font-bold">NScode</h2>
          <textarea
            name="nscode"
            id="nscode"
            className="flex-1 rounded-md border px-1 py-0.5 shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-50"
            value={nscode}
            disabled
          />
        </div>
      </div>
    </main>
  );
}
