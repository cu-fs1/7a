"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [response, setResponse] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000")
      .then((res) => setResponse(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Axios Request —{" "}
          <code className="text-sm font-mono">GET localhost:3000</code>
        </h1>

        {loading && (
          <p className="text-zinc-500 dark:text-zinc-400">Sending request…</p>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <p className="font-medium">Error</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {response && (
          <div className="rounded-lg bg-zinc-100 p-4 dark:bg-zinc-800">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Response
            </p>
            <pre className="overflow-x-auto text-sm text-zinc-800 dark:text-zinc-200">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
