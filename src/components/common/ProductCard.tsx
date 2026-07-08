import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
  // pass true for above-the-fold cards (first row) to eagerly load
  priority?: boolean;
};

const ProductCard = ({ data, priority = false }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto group w-full"
    >
      <div className="relative bg-gray-100 rounded-[13px] lg:rounded-[20px] w-full aspect-square mb-2.5 xl:mb-4 overflow-hidden">
        <Image
          src={data.srcUrl}
          fill
          sizes="(max-width: 768px) 50vw, 295px"
          className="object-cover group-hover:scale-110 transition-all duration-500"
          alt={data.title || "Product"}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <strong className="text-black xl:text-xl font-bold line-clamp-1">{data.title}</strong>
      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-1 mb-2 text-left h-[40px] overflow-hidden">
        {data.description || "Premium resort and booking services."}
      </p>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5 mb-3">
        <span className="font-bold text-[#FF8C00] text-lg xl:text-xl">
          Starting from ₹{data.price}
        </span>
      </div>
      <div className="w-full">
        <span className="w-full text-center block bg-[#FF8C00] text-white group-hover:bg-[#E67E00] font-semibold text-sm py-2.5 px-4 rounded-full transition-all duration-300">
          Enquiry Now
        </span>
      </div>
    </Link>
  );
};

// Prevent re-renders when parent re-renders but product data hasn't changed
export default React.memo(ProductCard);
