import ShopLandingPage from "@/components/shop/shop-page";
import { notFound } from "next/navigation";

export default async function ShopPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params?.slug || [];

  // slug example: ["men", "tops"]

  if (slug.length === 0) {
    // /shop
    return <ShopLandingPage />;
  }

  if (slug.length === 1) {
    // /shop/men
    const category = slug[0];
    // fetch all products for "men"
    const products = await fetch(
      `${process.env.API_URL}/products?category=${category}`
    ).then((res) => res.json());
    return <ShopLandingPage />;
  }

  if (slug.length === 2) {
    // /shop/men/tops
    const [category, subcategory] = slug;
    // fetch all products for "men → tops"
    const products = await fetch(
      `${process.env.API_URL}/products?category=${category}&subcategory=${subcategory}`
    ).then((res) => res.json());
    return <ShopLandingPage />;
  }

  if (slug.length === 3) {
    // /shop/men/tops/t-shirts
    const [category, subcategory, type] = slug;
    // fetch all products for "men → tops → t-shirts"
    const products = await fetch(
      `${process.env.API_URL}/products?category=${category}&subcategory=${subcategory}&type=${type}`
    ).then((res) => res.json());
    return <ShopLandingPage />;
  }

  if (slug.length === 4) {
    // /shop/men/tops/t-shirts/some-product-slug
    const productSlug = slug[3];
    const product = await fetch(
      `${process.env.API_URL}/products/${productSlug}`
    ).then((res) => res.json());

    if (!product) return notFound();

    return <ShopLandingPage />;
  }

  return notFound();
}
