import { notFound } from "next/navigation";
import { Suspense } from "react";
import { API_BASE_URL } from "@/lib/constants";
import ShopLandingPage, {
  Category,
  Subcategory,
  Type,
} from "@/components/shop/shop-page";
import ProductDetails from "@/components/shop/product-details";

async function safeJson<T>(res: Response): Promise<T | null> {
  try {
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default async function ShopPage(props: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;

  const searchTerm = searchParams?.keyword || "";
  const page = parseInt(searchParams?.page || "1", 10) || 1;
  const slugArray = slug ?? [];

  if (!API_BASE_URL) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        <p>Backend URL is not configured.</p>
      </div>
    );
  }

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
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return { products: [], totalPages: 1 };
      const data = await safeJson<any>(res);
      return {
        products: data?.data ?? data?.products ?? [],
        totalPages: data?.totalPages ?? 1,
      };
    } catch {
      return { products: [], totalPages: 1 };
    }
  }

  function getUniqueCategories(subcategories: Subcategory[]): Category[] {
    return subcategories
      .map((sub) => sub.category)
      .filter(
        (cat, index, self) => index === self.findIndex((c) => c._id === cat._id)
      );
  }

  if (searchTerm) {
    const { products, totalPages } = await fetchProducts(
      `${API_BASE_URL}/products/search`,
      searchTerm,
      page,
    );

    const tabsRes = await fetch(`${API_BASE_URL}/subcategories`, { cache: "no-store" }).catch(() => null);
    const tabData: Subcategory[] = tabsRes ? (await safeJson<Subcategory[]>(tabsRes)) ?? [] : [];
    const allCategoryFilter = getUniqueCategories(tabData);

    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><p>Loading...</p></div>}>
        <ShopLandingPage
          products={products}
          tabs={[]}
          slug={slugArray}
          currentPage={page}
          totalPages={totalPages}
        />
      </Suspense>
    );
  }

  if (slugArray.length === 0) {
    const { products, totalPages } = await fetchProducts(
      `${API_BASE_URL}/products`,
      undefined,
      page,
    );
    const tabsRes = await fetch(`${API_BASE_URL}/subcategories`, { cache: "no-store" }).catch(() => null);
    const tabData: Subcategory[] = tabsRes ? (await safeJson<Subcategory[]>(tabsRes)) ?? [] : [];
    const allCategoryFilter = getUniqueCategories(tabData);

    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><p>Loading...</p></div>}>
        <ShopLandingPage
          products={products ?? []}
          tabs={allCategoryFilter}
          slug={slugArray}
          currentPage={page}
          totalPages={totalPages}
        />
      </Suspense>
    );
  }

  if (slugArray.length === 1) {
    const categorySlug = slugArray[0];
    let products: any[] = [];
    let totalPages = 1;
    try {
      const res = await fetch(
        `${API_BASE_URL}/products/category/${categorySlug}?limit=12&page=${page}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const data = await safeJson<any>(res);
        products = data?.data ?? data?.products ?? [];
        totalPages = data?.totalPages ?? 1;
      }
    } catch {}

    const subcategoriesRes = await fetch(`${API_BASE_URL}/subcategories`, { cache: "no-store" }).catch(() => null);
    const tabData: Subcategory[] = subcategoriesRes ? (await safeJson<Subcategory[]>(subcategoriesRes)) ?? [] : [];
    const allSubcategories = tabData.filter(
      (sub) => sub.category.slug === categorySlug,
    );

    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><p>Loading...</p></div>}>
        <ShopLandingPage
          products={products ?? []}
          tabs={allSubcategories ?? []}
          slug={slugArray}
          currentPage={page}
          totalPages={totalPages}
        />
      </Suspense>
    );
  }

  if (slugArray.length === 2) {
    const [category, subcategory] = slugArray;
    let products: any[] = [];
    let totalPages = 1;
    try {
      const res = await fetch(
        `${API_BASE_URL}/products/subcategory/${category}/${subcategory}?limit=12&page=${page}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const data = await safeJson<any>(res);
        products = data?.data ?? data?.products ?? [];
        totalPages = data?.totalPages ?? 1;
      }
    } catch {}

    const typesRes = await fetch(`${API_BASE_URL}/types`, { cache: "no-store" }).catch(() => null);
    const typeData: Type[] = typesRes ? (await safeJson<{ data: Type[] }>(typesRes))?.data ?? [] : [];
    const allTypes = typeData.filter(
      (type: Type) =>
        type.subcategory.slug === subcategory &&
        type.subcategory.category.slug === category,
    );

    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><p>Loading...</p></div>}>
        <ShopLandingPage
          products={products ?? []}
          tabs={allTypes ?? []}
          slug={slugArray}
          currentPage={page}
          totalPages={totalPages}
        />
      </Suspense>
    );
  }

  if (slugArray.length === 3) {
    const typeSlug = slugArray[2];
    let products: any[] = [];
    let totalPages = 1;
    try {
      const res = await fetch(
        `${API_BASE_URL}/products/type/${typeSlug}?limit=12&page=${page}`,
        { cache: "no-store" },
      );
      if (res.ok) {
        const data = await safeJson<any>(res);
        products = data?.data ?? data?.products ?? [];
        totalPages = data?.totalPages ?? 1;
      }
    } catch {}

    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><p>Loading...</p></div>}>
        <ShopLandingPage
          products={products ?? []}
          tabs={[]}
          slug={slugArray}
          currentPage={page}
          totalPages={totalPages}
        />
      </Suspense>
    );
  }

  if (slugArray.length === 4) {
    const productSlug = slugArray[3];
    let product: any = null;
    try {
      const res = await fetch(`${API_BASE_URL}/products/product/${productSlug}`, { cache: "no-store" });
      if (res.ok) {
        const data = await safeJson<{ product: any }>(res);
        product = data?.product ?? null;
      }
    } catch {}

    return <ProductDetails slug={slugArray} product={product ?? []} />;
  }

  return notFound();
}
