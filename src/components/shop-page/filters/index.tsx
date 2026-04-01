"use client";

import React from "react";
import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { resetFilters } from "@/lib/features/filters/filtersSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const filters = useSelector((state: RootState) => state.filters);

  const handleApplyFilter = () => {
    // Create query parameters from filters
    const params = new URLSearchParams();

    if (filters.categories.length > 0) {
      params.append("categories", filters.categories.join(","));
    }
    if (filters.sizes.length > 0) {
      params.append("sizes", filters.sizes.join(","));
    }
    if (filters.priceRange) {
      params.append("minPrice", filters.priceRange[0].toString());
      params.append("maxPrice", filters.priceRange[1].toString());
    }

    // Navigate with query parameters
    const queryString = params.toString();
    const url = `/shop${queryString ? `?${queryString}` : ""}`;
    
    console.log("Applying filters:", filters);
    console.log("Navigating to:", url);
    
    router.push(url);
  };

  const handleResetFilter = () => {
    dispatch(resetFilters());
    router.push("/shop");
  };

  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection />
      <hr className="border-t-black/10" />
      <PriceSection />
      {/* <hr className="border-t-black/10" /> */}
      {/* <ColorsSection /> */}
      {/* <hr className="border-t-black/10" /> */}
      {/*   */}
      {/* <hr className="border-t-black/10" /> */}
      {/* <DressStyleSection /> */}
      <div className="flex gap-2">
        <Button
          type="button"
          className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
          onClick={handleApplyFilter}
        >
          Apply Filter
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-full text-sm font-medium py-4 h-12 border-black/20"
          onClick={handleResetFilter}
        >
          Reset
        </Button>
      </div>
    </>
  );
};

export default Filters;
