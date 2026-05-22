import { notFound } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import ShopLandingPage, {
  Category,
  Subcategory,
  Type,
} from "@/components/shop/shop-page";
import ProductDetails from "@/components/shop/product-details";

export default async function ShopPage(props: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;

  const searchTerm = searchParams?.keyword || "";
  const page = parseInt(searchParams?.page || "1", 10) || 1;
  const slugArray = slug ?? [];

  async function fetchProducts(
    endpoint: string,
    query?: string,
    pageNum?: number,
  ): Promise<{ products: any[]; totalPages: number }> {
    let url = endpoint;
    const params = new URLSearchParams();
    if (query) params.set("keyword", query);
    params.set("limit", "12");
    if (pageNum) params.set("page", String(pageNum));
    const qs = params.toString();
    if (qs) url += `?${qs}`;
    const res = await fetch(url);
    const data = await res.json();
    return {
      products: data?.data ?? data?.products ?? [],
      totalPages: data?.totalPages ?? 1,
    };
  }

  // Helper: extract unique categories from subcategories
  function getUniqueCategories(subcategories: Subcategory[]): Category[] {
    return subcategories
      .map((sub) => sub.category)
      .filter(
        (cat, index, self) => index === self.findIndex((c) => c._id === cat._id)
      );
  }

  // Handle search if searchTerm exists
  if (searchTerm) {
    const { products, totalPages } = await fetchProducts(
      `${API_BASE_URL}/products/search`,
      searchTerm,
      page,
    );

    const tabsRes = await fetch(`${API_BASE_URL}/subcategories`);
    const tabData: Subcategory[] = await tabsRes.json();
    const allCategoryFilter = getUniqueCategories(tabData);

    return (
      <ShopLandingPage
        products={products}
        tabs={[]}
        slug={slugArray}
        currentPage={page}
        totalPages={totalPages}
      />
    );
  }

  // If no search, handle normal slug-based routing
  if (slugArray.length === 0) {
    const { products, totalPages } = await fetchProducts(
      `${API_BASE_URL}/products`,
      undefined,
      page,
    );
    const tabsRes = await fetch(`${API_BASE_URL}/subcategories`);
    const tabData: Subcategory[] = await tabsRes.json();
    const allCategoryFilter = getUniqueCategories(tabData);

    return (
      <ShopLandingPage
        products={products ?? []}
        tabs={allCategoryFilter}
        slug={slugArray}
        currentPage={page}
        totalPages={totalPages}
      />
    );
  }

  if (slugArray.length === 1) {
    const categorySlug = slugArray[0];
    const res = await fetch(
      `${API_BASE_URL}/products/category/${categorySlug}?limit=12&page=${page}`,
    );
    const data = await res.json();
    const products = data?.data ?? data?.products ?? [];
    const totalPages = data?.totalPages ?? 1;

    const subcategoriesRes = await fetch(`${API_BASE_URL}/subcategories`);
    const tabData: Subcategory[] = await subcategoriesRes.json();
    const allSubcategories = tabData.filter(
      (sub) => sub.category.slug === categorySlug,
    );

    return (
      <ShopLandingPage
        products={products ?? []}
        tabs={allSubcategories ?? []}
        slug={slugArray}
        currentPage={page}
        totalPages={totalPages}
      />
    );
  }

  if (slugArray.length === 2) {
    const [category, subcategory] = slugArray;
    const res = await fetch(
      `${API_BASE_URL}/products/subcategory/${category}/${subcategory}?limit=12&page=${page}`,
    );
    const data = await res.json();
    const products = data?.data ?? data?.products ?? [];
    const totalPages = data?.totalPages ?? 1;

    const typesRes = await fetch(`${API_BASE_URL}/types`);
    const { data: typeData } = await typesRes.json();
    const allTypes = typeData.filter(
      (type: Type) =>
        type.subcategory.slug === subcategory &&
        type.subcategory.category.slug === category,
    );

    return (
      <ShopLandingPage
        products={products ?? []}
        tabs={allTypes ?? []}
        slug={slugArray}
        currentPage={page}
        totalPages={totalPages}
      />
    );
  }

  if (slugArray.length === 3) {
    const typeSlug = slugArray[2];
    const res = await fetch(
      `${API_BASE_URL}/products/type/${typeSlug}?limit=12&page=${page}`,
    );
    const data = await res.json();
    const products = data?.data ?? data?.products ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
      <ShopLandingPage
        products={products ?? []}
        tabs={[]}
        slug={slugArray}
        currentPage={page}
        totalPages={totalPages}
      />
    );
  }

  if (slugArray.length === 4) {
    const productSlug = slugArray[3];
    const res = await fetch(`${API_BASE_URL}/products/product/${productSlug}`);
    const { product } = await res.json();

    return <ProductDetails slug={slugArray} product={product ?? []} />;
  }

  return notFound();
}

// import { notFound } from "next/navigation";
// import { API_BASE_URL } from "@/lib/constants";
// import ShopLandingPage, {
//   Category,
//   Subcategory,
//   Type,
// } from "@/components/shop/shop-page";
// import ProductDetails from "@/components/shop/product-details";

// export default async function ShopPage({
//   params,
// }: {
//   params: Promise<{ slug?: string[] }>;
// }) {
//   const { slug } = await params;
//   const slugArray = slug ?? [];

//   if (slugArray.length === 0) {
//     const response = await fetch(`${API_BASE_URL}/products`);
//     const data = await response.json();
//     const tabs = await fetch(`${API_BASE_URL}/subcategories`);
//     const tabData = await tabs.json();

//     function getUniqueCategories(subcategories: Subcategory[]): Category[] {
//       return subcategories
//         .map((sub) => sub.category)
//         .filter(
//           (cat, index, self) =>
//             index === self.findIndex((c) => c._id === cat._id)
//         );
//     }

//     const allCategoryFilter = getUniqueCategories(tabData);
//     return (
//       <ShopLandingPage
//         products={data.products ?? []}
//         tabs={allCategoryFilter ?? []}
//         slug={slugArray}
//       />
//     );
//   }

//   if (slugArray.length === 1) {
//     const response = await fetch(
//       `${API_BASE_URL}/products/category/${slugArray[0]}`
//     );
//     const data = await response.json();
//     console.log(data);
//     const subcategories = await fetch(`${API_BASE_URL}/subcategories`);
//     const tabData = await subcategories.json();
//     const allSubcategories = tabData.filter(
//       (sub: Subcategory) => sub.category.slug === slugArray[0]
//     );

//     return (
//       <ShopLandingPage
//         products={data.products ?? []}
//         tabs={allSubcategories ?? []}
//         slug={slugArray}
//       />
//     );
//   }

//   if (slugArray.length === 2) {
//     const [category, subcategory] = slugArray;
//     const { products } = await fetch(
//       `${API_BASE_URL}/products/subcategory/${category}/${subcategory}`
//     ).then((res) => res.json());

//     const types = await fetch(`${API_BASE_URL}/types`);
//     const { data: typeData } = await types.json();
//     const allTypes = typeData.filter(
//       (type: Type) =>
//         type.subcategory.slug === subcategory &&
//         type.subcategory.category.slug === category
//     );

//     return (
//       <ShopLandingPage
//         products={products ?? []}
//         tabs={allTypes ?? []}
//         slug={slugArray}
//       />
//     );
//   }

//   if (slugArray.length === 3) {
//     const [category, subcategory, type] = slugArray;
//     const { products } = await fetch(
//       `${API_BASE_URL}/products/type/${type}`
//     ).then((res) => res.json());

//     return (
//       <ShopLandingPage products={products ?? []} tabs={[]} slug={slugArray} />
//     );
//   }

//   if (slugArray.length === 4) {
//     const productSlug = slugArray[3];
//     const { product } = await fetch(
//       `${API_BASE_URL}/products/product/${productSlug}`
//     ).then((res) => res.json());

//     return <ProductDetails slug={[...slugArray]} product={product ?? []} />;
//   }

//   return notFound();
// }
