"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/common/ProductCard";
import { Product } from "@/types/product.types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ApiProduct {
  _id: string;
  name: string;
  category?: { name: string; _id?: string };
  variants?: Array<{
    images?: string[];
    price?: number;
    isDefault?: boolean;
  }>;
}

const ITEMS_PER_PAGE = 12;

// Skeleton card shown while loading
const SkeletonCard = () => (
  <div className="flex flex-col items-start animate-pulse">
    <div className="bg-gray-200 rounded-[13px] lg:rounded-[20px] w-full aspect-square mb-2.5" />
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-1.5" />
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
    <div className="h-5 bg-gray-200 rounded w-1/3" />
  </div>
);

const ShopProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const api = process.env.NEXT_PUBLIC_API_URL;
  const prevParamsRef = useRef<string>("");

  useEffect(() => {
    const paramsKey = searchParams.toString();
    // Reset to page 1 when filters change
    if (paramsKey !== prevParamsRef.current) {
      prevParamsRef.current = paramsKey;
      setCurrentPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!api) return;

    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        const categories = searchParams.get("categories");
        const sizes = searchParams.get("sizes");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const search = searchParams.get("search");

        if (categories) params.append("category", categories);
        if (sizes) params.append("sizes", sizes);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (search) params.append("search", search);

        params.append("skip", String((currentPage - 1) * ITEMS_PER_PAGE));
        params.append("limit", String(ITEMS_PER_PAGE));

        const res = await fetch(
          `${api}/product?${params.toString()}`,
          { signal: controller.signal }
        );
        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
          setProducts([]);
          setTotalPages(1);
          setLoading(false);
          return;
        }
        const data = await res.json();

        if (data.products && Array.isArray(data.products)) {
          const mapped: Product[] = data.products.map((p: ApiProduct) => {
            const v = p.variants?.find((v) => v.isDefault) || p.variants?.[0];
            return {
              id: p._id,
              title: p.name,
              category: p.category?.name || "General",
              srcUrl: v?.images?.[0] || "/images/pic1.png",
              gallery: v?.images || [],
              price: v?.price || 0,
              discount: { amount: 0, percentage: 0 },
              rating: 4,
            };
          });

          setProducts(mapped);
          // Use total from API if available, otherwise estimate
          const total = data.total ?? data.products.length;
          setTotalPages(Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)));
        } else {
          setProducts([]);
          setTotalPages(1);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setProducts([]);
          setTotalPages(1);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [searchParams, currentPage, api]);

  const search = searchParams.get("search");
  const categories = searchParams.get("categories");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  return (
    <div className="flex flex-col w-full space-y-5">
      {/* Active filter labels */}
      {(search || categories || minPrice || maxPrice) && (
        <div className="text-sm text-black/60 space-y-1">
          {search && <p>Results for: <span className="font-semibold text-black">"{search}"</span></p>}
          {categories && <p>Category: <span className="font-semibold text-black">{categories.split(",").join(", ")}</span></p>}
          {(minPrice || maxPrice) && (
            <p>Price: <span className="font-semibold text-black">₹{minPrice || "0"} – ₹{maxPrice || "∞"}</span></p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <SkeletonCard key={i} />)
          : products.map((product, idx) => (
              <ProductCard key={product.id} data={product} priority={idx < 3} />
            ))}
      </div>

      {/* Empty state */}
      {!loading && products.length === 0 && (
        <div className="w-full text-center py-20">
          <p className="text-black/60">
            {search
              ? `No products found for "${search}".`
              : "No products found matching your filters."}
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <>
          <hr className="border-t-black/10" />
          <Pagination className="justify-between">
            <PaginationPrevious
              href="#"
              onClick={(e) => { e.preventDefault(); currentPage > 1 && setCurrentPage(p => p - 1); }}
              className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : "border border-black/10"}
            />
            <PaginationContent>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                    isActive={currentPage === page}
                    className="text-black/50 font-medium text-sm"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalPages > 5 && (
                <PaginationItem>
                  <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                </PaginationItem>
              )}
            </PaginationContent>
            <PaginationNext
              href="#"
              onClick={(e) => { e.preventDefault(); currentPage < totalPages && setCurrentPage(p => p + 1); }}
              className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "border border-black/10"}
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default ShopProductsList;
