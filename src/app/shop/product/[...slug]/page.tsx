import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import { Product, ProductVariant } from "@/types/product.types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const api = process.env.NEXT_PUBLIC_API_URL;

async function getProduct(id: string): Promise<Product | null> {
  if (!api) return null;
  try {
    const res = await fetch(`${api}/product/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return null;
    const data = await res.json();
    const p = data.product ?? data;

    const variants: ProductVariant[] = (p.variants ?? []).map((v: any) => ({
      _id: v._id || "",
      color: v.name || v.color || "", // fallback compatibility
      sizesArray: [],
      price: v.price || 0,
      stock: 0,
      images: Array.isArray(v.images) ? v.images : v.images ? [v.images] : [],
      isDefault: !!v.isDefault,
      description: v.description || "",
      duration: v.duration || "",
      capacity: v.capacity || "",
      maxGuests: v.maxGuests || "",
      roomType: v.roomType || "",
      serviceType: v.serviceType || "",
    }));

    const defaultVariant = variants.find((v) => v.isDefault) || variants[0];

    return {
      id: p._id,
      title: p.name,
      category: p.category?.name || "General",
      description: p.description || "No product description available.",
      srcUrl: defaultVariant?.images?.[0] || "/images/pic1.png",
      gallery: defaultVariant?.images || [],
      price: defaultVariant?.price || 0,
      discount: { amount: 0, percentage: 0 },
      rating: 4,
      variants,
      amenities: p.amenities || []
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const productId = slug[0];
  
  try {
    const productData = await getProduct(productId);

    if (!productData?.title) {
      notFound();
    }

    return (
      <main>
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
          <BreadcrumbProduct title={productData?.title ?? "product"} />
          <section className="mb-11">
            <Header data={productData} />
          </section>
          
          {/* Location Map Section */}
          <section className="mb-11">
            <h2 className="text-2xl font-bold mb-5">Location</h2>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://maps.google.com/maps?q=11.207972,76.233894&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </section>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Product page error:", error);
    notFound();
  }
}
