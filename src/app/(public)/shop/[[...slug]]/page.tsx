import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import ShopLandingPage, {
  Category,
  Subcategory,
  Type,
} from "@/components/shop/shop-page";
import ProductDetails from "@/components/shop/product-details";

export default async function ShopPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const slugArray = slug ?? [];

  if (slugArray.length === 0) {
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
        products={data.products ?? []}
        tabs={allCategoryFilter ?? []}
        slug={slugArray}
      />
    );
  }

  if (slugArray.length === 1) {
    const response = await fetch(
      `${API_BASE_URL}/products/category/${slugArray[0]}`
    );
    const data = await response.json();
    console.log(data);
    const subcategories = await fetch(`${API_BASE_URL}/subcategories`);
    const tabData = await subcategories.json();
    const allSubcategories = tabData.filter(
      (sub: Subcategory) => sub.category.slug === slugArray[0]
    );

    return (
      <ShopLandingPage
        products={data.products ?? []}
        tabs={allSubcategories ?? []}
        slug={slugArray}
      />
    );
  }

  if (slugArray.length === 2) {
    const [category, subcategory] = slugArray;
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

    return (
      <ShopLandingPage
        products={products ?? []}
        tabs={allTypes ?? []}
        slug={slugArray}
      />
    );
  }

  if (slugArray.length === 3) {
    const [category, subcategory, type] = slugArray;
    const { products } = await fetch(
      `${API_BASE_URL}/products/type/${type}`
    ).then((res) => res.json());

    return (
      <ShopLandingPage products={products ?? []} tabs={[]} slug={slugArray} />
    );
  }

  if (slugArray.length === 4) {
    const productSlug = slugArray[3];
    const { product } = await fetch(
      `${API_BASE_URL}/products/product/${productSlug}`
    ).then((res) => res.json());

    return <ProductDetails slug={[...slugArray]} product={product ?? []} />;
  }

  return notFound();
}
