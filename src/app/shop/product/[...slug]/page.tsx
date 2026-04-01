import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import { Product, ProductVariant } from "@/types/product.types";
import { notFound } from "next/navigation";
const api = process.env.NEXT_PUBLIC_API_URL;

async function getProduct(id: string): Promise<Product | null> {
  if (!api) return null;
  try {
    const res = await fetch(`${api}/api/product/${id}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour for better performance
    });
    if (!res.ok) return null;
    
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
  params: { slug: string[] };
}) {
  if (!params.slug || params.slug.length === 0) {
    notFound();
  }

  const productId = params.slug[0];
  
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
        </div>
      </main>
    );
  } catch (error) {
    console.error("Product page error:", error);
    notFound();
  }
}
