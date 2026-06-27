"use client";

import React from "react";
import { Product } from "@/types/product.types";

type Props = {
  data: Product;
  attributes?: string[];
};

const AddToCardSection = ({ data, attributes = [] }: Props) => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "9447105944";
  
  const textMessage = `Hi, I'm interested in booking:
*${data.title}*
${attributes.length > 0 ? `Details: ${attributes.join(", ")}\n` : ""}Price: ₹${data.price}`;

  return (
    <div className="fixed md:relative w-full bg-background border-t md:border-none border-border bottom-0 left-0 p-4 md:p-0 z-10 flex items-center gap-3">
      <a 
        href={`https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(textMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white w-full rounded-full h-11 md:h-[52px] text-sm sm:text-base flex items-center justify-center hover:bg-[#128C7E] transition-all font-medium"
      >
        Book on WhatsApp
      </a>
    </div>
  );
};

export default AddToCardSection;
