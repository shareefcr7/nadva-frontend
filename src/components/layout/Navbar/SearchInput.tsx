"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InputGroup from "@/components/ui/input-group";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setSuggestions,
  setIsLoading,
} from "@/lib/features/search/searchSlice";
import type { RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SearchInput = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const api = process.env.NEXT_PUBLIC_API_URL;

  const { query, suggestions, isLoading } = useSelector(
    (state: RootState) => state.search
  );

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!query.trim()) {
      dispatch(setSuggestions([]));
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      dispatch(setIsLoading(true));
      try {
        const searchTerm = query.trim().toLowerCase();
        
        // Fetch all products and filter on frontend
        const res = await fetch(
          `${api}/api/product?limit=100`
        );
        const data = await res.json();

        console.log("🔍 Raw API response:", data);

        if (data.products && Array.isArray(data.products)) {
          // Filter products based on search query
          const filteredProducts = data.products.filter((p: any) => {
            const name = (p.name || "").toLowerCase();
            const category = (p.category?.name || "").toLowerCase();
            const description = (p.description || "").toLowerCase();
            
            return (
              name.includes(searchTerm) ||
              category.includes(searchTerm) ||
              description.includes(searchTerm)
            );
          });

          console.log(`🔍 Filtered "${query}" - Found ${filteredProducts.length} products from ${data.products.length} total`);

          // Map top 5 filtered results
          const mappedSuggestions = filteredProducts.slice(0, 5).map((p: any) => {
            const defaultVariant =
              p.variants?.find((v: any) => v.isDefault) || p.variants?.[0];
            return {
              id: p._id,
              title: p.name,
              category: p.category?.name || "General",
              price: defaultVariant?.price || 0,
              srcUrl: defaultVariant?.images?.[0] || "/images/pic1.png",
            };
          });

          console.log("🔍 Mapped suggestions:", mappedSuggestions);
          dispatch(setSuggestions(mappedSuggestions));
          setShowSuggestions(true);
        } else {
          console.log("⚠️ No products in response");
          dispatch(setSuggestions([]));
        }
      } catch (error) {
        console.error("❌ Error fetching suggestions:", error);
        dispatch(setSuggestions([]));
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    // Debounce search
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query, dispatch]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
      // Don't clear the query here - let it persist for reference
    }
  };

  const handleSuggestionClick = (productId: string, productName: string) => {
    const titleSlug = productName.split(" ").join("-");
    console.log("🔍 Navigating to product:", { productId, titleSlug });
    router.push(`/shop/product/${productId}/${titleSlug}`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full md:mr-3 lg:mr-10">
      <form onSubmit={handleSearch}>
        <InputGroup className="flex bg-[#F0F0F0]">
          <InputGroup.Text>
            <Image
              priority
              src="/icons/search.svg"
              height={20}
              width={20}
              alt="search"
              className="min-w-5 min-h-5"
            />
          </InputGroup.Text>
          <InputGroup.Input
            ref={inputRef}
            type="search"
            name="search"
            placeholder="Search for products..."
            className="bg-transparent placeholder:text-black/40"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && setShowSuggestions(true)}
          />
        </InputGroup>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query.trim() || suggestions.length > 0) && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border border-black/10 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center text-black/60 text-sm">
              Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="divide-y divide-black/5">
              {suggestions.map((product) => (
                <button
                  key={product.id}
                  onClick={() =>
                    handleSuggestionClick(product.id, product.title)
                  }
                  className="w-full flex items-center gap-3 p-3 hover:bg-[#F0F0F0] transition-colors text-left"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded bg-[#F0F0F0] overflow-hidden">
                    <Image
                      src={product.srcUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {product.title}
                    </p>
                    <p className="text-xs text-black/60">{product.category}</p>
                    <p className="text-sm font-semibold text-black mt-1">
                      ₹{product.price}
                    </p>
                  </div>
                </button>
              ))}
              <button
                onClick={() => {
                  router.push(`/shop?search=${encodeURIComponent(query)}`);
                  setShowSuggestions(false);
                }}
                className="w-full p-3 text-center text-sm font-medium text-black hover:bg-[#F0F0F0] transition-colors bg-white"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="p-4 text-center text-black/60 text-sm">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
