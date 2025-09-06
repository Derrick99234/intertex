import { Product } from "@/components/admin/products/view-product";
// Removed invalid import of PageProps from "next"
import ShopLandingPage, {
  Category,
  Subcategory,
  Type,
} from "@/components/shop/shop-page";
import { API_BASE_URL } from "@/lib/constants";
import { notFound } from "next/navigation";

interface ShopParamsProps {
  params: { slug?: string[] };
}

export default async function ShopPage({ params }: ShopParamsProps) {
  const slug = params?.slug || [];

  if (slug.length === 0) {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    const tabs = await fetch(`${API_BASE_URL}/subcategories`);
    const tabData = await tabs.json();

    function getUniqueCategories(subcategories: Subcategory[]): Category[] {
      return subcategories
        .map((sub) => sub.category)
        .filter(
          (cat, index, self) =>
            index === self.findIndex((c) => c._id === cat._id)
        );
    }

    const allCategoryFilter = getUniqueCategories(tabData);
    return (
      <ShopLandingPage
        products={data.products}
        tabs={allCategoryFilter}
        slug={slug}
      />
    );
  }

  if (slug.length === 1) {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${slug[0]}`
    );
    const data = await response.json();

    const subcategories = await fetch(`${API_BASE_URL}/subcategories`);
    const tabData = await subcategories.json();
    const allSubcategories = tabData.filter(
      (sub: Subcategory) => sub.category.slug === slug[0]
    );

    return (
      <ShopLandingPage
        products={data.products}
        tabs={allSubcategories}
        slug={slug}
      />
    );
  }

  if (slug.length === 2) {
    const [category, subcategory] = slug;
    const { products } = await fetch(
      `${API_BASE_URL}/products/subcategory/${category}/${subcategory}`
    ).then((res) => res.json());

    const types = await fetch(`${API_BASE_URL}/types`);
    const { data: typeData } = await types.json();
    const allTypes = typeData.filter(
      (type: Type) =>
        type.subcategory.slug === subcategory &&
        type.subcategory.category.slug === category
    );

    return <ShopLandingPage products={products} tabs={allTypes} slug={slug} />;
  }

  if (slug.length === 3) {
    const [category, subcategory, type] = slug;
    const { products } = await fetch(
      `${API_BASE_URL}/products/type/${type}`
    ).then((res) => res.json());

    return <ShopLandingPage products={products} tabs={[]} slug={slug} />;
  }

  // if (slug.length === 4) {
  //   // /shop/men/tops/t-shirts/some-product-slug
  //   const productSlug = slug[3];
  //   const product = await fetch(
  //     `${process.env.API_URL}/products/${productSlug}`
  //   ).then((res) => res.json());

  //   if (!product) return notFound();

  //   return <ShopLandingPage products={product} />;
  // }

  return notFound();
}
