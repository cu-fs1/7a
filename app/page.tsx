"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: string;
}

interface ProductsResponse {
  products: Product[];
}

export default function Home() {
  const [data, setData] = useState<ProductsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get<ProductsResponse>("http://localhost:3000/products")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-2 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Products
        </h1>

        {loading && (
          <div className="py-6">
            <Spinner />
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            <p className="font-medium">Error</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        )}

        {data && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((product) => (
                <Card key={product._id}>
                  <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>{product.category}</CardDescription>
                    <CardAction>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          product.inStock
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                      ${product.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      Added{" "}
                      {new Date(product.createdAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" },
                      )}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
