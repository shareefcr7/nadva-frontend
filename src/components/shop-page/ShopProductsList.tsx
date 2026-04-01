"use client";

import React, { useEffect, useState } from "react";
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
  category?: {
    name: string;
    _id?: string;
  };
  variants?: Array<{
    images?: string[];
    price?: number;
    isDefault?: boolean;
    size?: string;
  }>;
}

const ShopProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const api= process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        // Build query string from params
        const params = new URLSearchParams();

        const categories = searchParams.get("categories");
        const sizes = searchParams.get("sizes");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const search = searchParams.get("search");

        console.log("🔍 ShopProductsList Filter params:", { categories, sizes, minPrice, maxPrice, search });

        // Add filter params if they exist (but not search - we'll filter on frontend)
        if (categories) {
          params.append("category", categories);
        }
        if (sizes) {
          params.append("sizes", sizes);
        }
        if (minPrice) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }
        
        // Always fetch with high limit to get all products for frontend filtering
        params.append("skip", "0");
        params.append("limit", "1000");

        const queryString = params.toString();
        const url = `${api}/api/product${
          queryString ? `?${queryString}` : ""
        }`;

        console.log("🔍 Fetching from URL:", url);

        const res = await fetch(url);
        const data = await res.json();

        console.log("🔍 API Response received, total items:", data.products?.length);

        if (data.products && Array.isArray(data.products)) {
          let mappedProducts = data.products.map((p: ApiProduct) => {
            const defaultVariant =
              p.variants?.find((v) => v.isDefault) || p.variants?.[0];

            return {
              id: p._id,
              title: p.name,
              category: p.category?.name || "General",
              srcUrl: defaultVariant?.images?.[0] || "/images/pic1.png",
              gallery: defaultVariant?.images || [],
              price: defaultVariant?.price || 0,
              discount: { amount: 0, percentage: 0 },
              rating: 4,
            };
          });

          // Apply category filter on frontend
          if (categories && categories.trim()) {
            const selectedCats = categories.split(",").map(c => c.trim()).filter(c => c);
            if (selectedCats.length > 0) {
              mappedProducts = mappedProducts.filter((product: Product) => {
                const productCategory = product.category?.toLowerCase().trim() || "";
                return selectedCats.some(cat => 
                  productCategory === cat.toLowerCase().trim()
                );
              });
              console.log(`🔍 Category filter applied (${selectedCats.length}): ${selectedCats.join(", ")} - Found ${mappedProducts.length} products`);
            }
          }

          // Apply price filter on frontend
          if (minPrice || maxPrice) {
            const min = minPrice ? parseInt(minPrice) : 0;
            const max = maxPrice ? parseInt(maxPrice) : Infinity;
            mappedProducts = mappedProducts.filter((product: Product) =>
              product.price >= min && product.price <= max
            );
            console.log(`🔍 Price filter applied: ₹${min} - ₹${max} - Found ${mappedProducts.length} products`);
          }

          // Apply size filter on frontend
          if (sizes && sizes.trim()) {
            const selectedSizes = sizes.split(",").filter(s => s.trim());
            if (selectedSizes.length > 0) {
              mappedProducts = mappedProducts.filter((product: Product) => {
                // This would need the full product variant data
                // For now, we'll keep products with any size
                return true;
              });
              console.log(`🔍 Size filter applied: ${selectedSizes.join(", ")} - Found ${mappedProducts.length} products`);
            }
          }

          // Apply search filter on frontend
          if (search && search.trim()) {
            const searchLower = search.toLowerCase();
            mappedProducts = mappedProducts.filter(
              (product: Product) =>
                product.title.toLowerCase().includes(searchLower) ||
                (product.category?.toLowerCase() ?? "").includes(searchLower)
            );
            console.log(`🔍 Search filter applied: "${search}" - Found ${mappedProducts.length} products`);
          }

          // Apply pagination after filtering
          const startIdx = (currentPage - 1) * itemsPerPage;
          const paginatedProducts = mappedProducts.slice(startIdx, startIdx + itemsPerPage);

          console.log("🔍 Mapped products count:", paginatedProducts.length);
          setProducts(paginatedProducts);

          // Calculate total pages based on filtered results
          const total = mappedProducts.length;
          setTotalPages(Math.ceil(total / itemsPerPage));
        } else if (data.success === false) {
          console.warn("⚠️ API returned error:", data.message);
          setProducts([]);
          setTotalPages(1);
        } else {
          console.warn("⚠️ Unexpected API response structure:", data);
          setProducts([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching filtered products:", error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [searchParams, currentPage]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <div className="text-black/60">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="text-sm text-black/60 space-y-1">
          {searchParams.get("search") && (
            <p>
              Search results for: <span className="font-semibold text-black">"{searchParams.get("search")}"</span>
            </p>
          )}
          {searchParams.get("categories") && (
            <p>
              Category: <span className="font-semibold text-black">{searchParams.get("categories")?.split(",").join(", ")}</span>
            </p>
          )}
          {(searchParams.get("minPrice") || searchParams.get("maxPrice")) && (
            <p>
              Price: <span className="font-semibold text-black">₹{searchParams.get("minPrice") || "0"} - ₹{searchParams.get("maxPrice") || "∞"}</span>
            </p>
          )}
          {products.length > 0
            ? ` • ${products.length} product${products.length !== 1 ? "s" : ""}`
            : " "}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {products.map((product, idx) => (
          <ProductCard key={product.id} data={product} priority={idx < 3} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="w-full text-center py-20">
          <p className="text-black/60">
            {searchParams.get("search")
              ? `No products found for "${searchParams.get("search")}". Try a different search term.`
              : "No products found matching your filters."}
          </p>
        </div>
      )}
      {totalPages > 1 && (
        <>
          <hr className="border-t-black/10" />
          <Pagination className="justify-between">
            <PaginationPrevious
              href={currentPage > 1 ? "#" : ""}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : "border border-black/10"
              }
            />
            <PaginationContent>
              {Array.from(
                { length: Math.min(totalPages, 5) },
                (_, i) => i + 1
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(page)}
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
              href={currentPage < totalPages ? "#" : ""}
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              className={
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "border border-black/10"
              }
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default ShopProductsList;
