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
      color: v.color || "",
      sizesArray: Array.isArray(v.sizes)
        ? v.sizes.map((s: any) => ({
            _id: s._id || "",
            size: s.size || "",
            stock: s.stock ?? 0,
          }))
        : [],
      price: v.price || 0,
      stock: v.stock || 0,
      images: Array.isArray(v.images) ? v.images : v.images ? [v.images] : [],
      isDefault: !!v.isDefault,
    }));

    const defaultVariant = variants.find((v) => v.isDefault) || variants[0];

    return {
      id: p._id,
      title: p.name,
      category: p.category?.name || "General",
      description: p.description || "",
      srcUrl: defaultVariant?.images?.[0] || "/images/pic1.png",
      gallery: defaultVariant?.images || [],
      price: defaultVariant?.price || 0,
      discount: { amount: 0, percentage: 0 },
      rating: 4,
      variants,
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.35334185191!2d76.3263001!3d9.9877995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d507b966ab3%3A0x67396a84d416b9b3!2sKerala!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin"
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
