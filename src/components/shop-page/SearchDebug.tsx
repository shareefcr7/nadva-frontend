"use client";

import { useSearchParams } from "next/navigation";

export default function SearchDebug() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const categories = searchParams.get("categories");
  const sizes = searchParams.get("sizes");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const api = process.env.NEXT_PUBLIC_API_URL;

  const requestUrl = `${api}/product?${
    search ? `search=${encodeURIComponent(search)}&query=${encodeURIComponent(search)}&` : ""
  }${categories ? `category=${categories}&` : ""}${
    sizes ? `sizes=${sizes}&` : ""
  }${minPrice ? `minPrice=${minPrice}&` : ""}${
    maxPrice ? `maxPrice=${maxPrice}&` : ""
  }skip=0&limit=12`;

  console.log("🔍 DEBUG INFO:", {
    search,
    categories,
    sizes,
    minPrice,
    maxPrice,
    url: requestUrl,
  });

  return <div className="hidden" />;
}
