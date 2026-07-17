import ProductListSec from "@/components/common/ProductListSec";
import HeroBanner from "@/components/homepage/Header";
import FacilitiesSection from "@/components/homepage/FacilitiesSection";
import { Product } from "@/types/product.types";
import { Banner } from "@/types/banner.types";

export const revalidate = 60;

const api = process.env.NEXT_PUBLIC_API_URL;

async function getProducts(): Promise<Product[]> {
  if (!api) return [];
  try {
    const res = await fetch(`${api}/product`, {
      next: { revalidate: 60 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
    const data = await res.json();
    if (!data.products) return [];

    return data.products.map((p: any) => {
      const defaultVariant =
        p.variants?.find((v: any) => v.isDefault) || p.variants?.[0];
      const startingPrice = defaultVariant?.price || 0;

      return {
        id: p._id,
        title: p.name,
        category: p.category?.name || "General",
        description: p.description || "No description available.",
        srcUrl: defaultVariant?.images?.[0] || "/images/pic1.png",
        gallery: defaultVariant?.images || [],
        price: startingPrice,
        discount: { amount: 0, percentage: 0 },
        rating: 4,
        amenities: p.amenities || []
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getFacilities() {
  if (!api) return [];
  try {
    const res = await fetch(`${api}/facility`, {
      next: { revalidate: 60 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
    const data = await res.json();
    return data.facilities ?? [];
  } catch {
    return [];
  }
}

async function getBanners(): Promise<Banner[]> {
  if (!api) return [];
  try {
    const res = await fetch(`${api}/banner`, {
      next: { revalidate: 60 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
    const data = await res.json();
    return data.banners ?? [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

// Server component — no "use client", no useEffect, no client-side waterfall
export default async function Home() {
  const [products, facilities, banners] = await Promise.all([
    getProducts(),
    getFacilities(),
    getBanners(),
  ]);

  return (
    <>
      <HeroBanner banners={banners} />
      <FacilitiesSection facilities={facilities} />
      <main className="my-[50px] sm:my-[72px]">
        <div id="tarif">
          <ProductListSec
            title="Our Packages & Tarif"
            data={products}
            viewAllLink="/shop"
          />
        </div>
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
      </main>
    </>
  );
}
