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
      className="flex flex-col items-start aspect-auto group w-full h-full p-3 sm:p-4 rounded-[16px] sm:rounded-[24px] bg-white border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
    >
      <div className="relative bg-gray-50 rounded-[12px] sm:rounded-[18px] w-full aspect-square mb-3 overflow-hidden flex-shrink-0">
        <Image
          src={data.srcUrl}
          fill
          sizes="(max-width: 480px) 40vw, (max-width: 768px) 45vw, (max-width: 1024px) 40vw, 295px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          alt={data.title || "Product"}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <strong className="text-gray-900 text-sm sm:text-base lg:text-lg font-bold line-clamp-1 leading-tight group-hover:text-primary transition-colors duration-300">{data.title}</strong>
      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-1.5 mb-3 text-left min-h-[32px] sm:min-h-[40px] leading-relaxed">
        {data.description || "Premium resort and booking services."}
      </p>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5 mb-3 mt-auto">
        <span className="font-bold text-[#FF8C00] text-sm sm:text-base lg:text-lg">
          ₹{data.price}
        </span>
      </div>
      <div className="w-full">
        <span className="w-full text-center block bg-[#FF8C00] text-white group-hover:bg-[#E67E00] font-semibold text-xs sm:text-sm py-2 sm:py-2.5 px-3 sm:px-4 rounded-full transition-all duration-300 truncate shadow-sm group-hover:shadow-md transform group-hover:-translate-y-[2px]">
          Enquiry Now
        </span>
      </div>
    </Link>
  );
};

// Prevent re-renders when parent re-renders but product data hasn't changed
export default React.memo(ProductCard);
