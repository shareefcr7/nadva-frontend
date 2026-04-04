"use client";

import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "@/lib/features/filters/filtersSlice";
import type { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";

type Category = {
  _id?: string;
  name: string;
  slug: string;
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state: RootState) => state.filters.categories
  );
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${api}/category`);
        const data = await res.json();

        // Handle different API response structures
        if (Array.isArray(data)) {
          setCategories(data);
        } else if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else if (Array.isArray(data.data)) {
          setCategories(data.data);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryToggle = (categoryName: string) => {
    console.log("🔍 Toggling category:", categoryName);
    dispatch(toggleCategory(categoryName));
  };

  return (
    <Accordion type="single" collapsible defaultValue="filter-category">
      <AccordionItem value="filter-category" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Category
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          {loading ? (
            <div className="text-sm text-black/60">Loading...</div>
          ) : categories.length > 0 ? (
            <div className="flex flex-col space-y-2">
              {categories.map((category) => {
                // Use category name as the identifier
                const categoryName = category.name;
                const isSelected = selectedCategories.includes(categoryName);

                console.log(`Category: ${categoryName}, Selected: ${isSelected}`);

                return (
                  <label
                    key={categoryName}
                    className="flex items-center space-x-2 cursor-pointer py-1"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(categoryName)}
                      className="w-4 h-4 rounded border-black/30 cursor-pointer"
                    />
                    <span className="text-sm text-black/60">{category.name}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-black/60">No categories found</div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CategoriesSection;