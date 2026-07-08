# Frontend Audit — intertex

---

## CRITICAL

### 1. `src/app/(public)/shop/cart/page.tsx` — window.location.href breaks SPA navigation
Lines 262, 270:
```ts
window.location.href = data.data.authorization_url;
window.location.href = "/order";
```
Using `window.location.href` triggers a full page reload, losing all React state and causing a flash. Should use `router.push()` or `window.open()` for external URLs, `router.push()` for internal.

### 2. `src/components/shop/product-details.tsx:176` — window.location.href for payment redirect
Uses `window.location.href` for Paystack redirect. Same issue — should use `router.push()` or keep `window.location.href` only for external payment gateways. (External URL is acceptable for Paystack; internal `/order` redirect is not.)

### 3. `src/components/header/header.tsx` — Logout uses full page reload
```ts
window.location.href = "/";
```
After logout, triggers full page reload instead of using `router.push("/")`. Loses all client state.

### 4. `src/components/auth/create-user.tsx` — Registration uses window.location.href
Line 34:
```ts
window.location.href = "/register";
```
Should use `router.push("/register")`.

### 5. `src/app/(public)/shop/[[...slug]]/page.tsx` — No Suspense boundary for searchParams
The page is a Server Component that destructures `searchParams` but wraps `ShopLandingPage` in `<Suspense>` only around the render output. The `searchParams` are read at the top level which is fine for server components, but `ShopLandingPage` is a client component that may use `useSearchParams()` — need to verify.

### 6. `src/app/(public)/payment-success/page.tsx` — Uses window.location.href
Likely uses `window.location.href` for redirects instead of `router.push()`.

---

## HIGH

### 7. `src/lib/auth-fetch.ts` — No refresh queue/lock
If multiple API calls fail with 401 simultaneously, ALL of them fire a refresh request. This causes N concurrent refresh calls, most of which will fail (old refresh token used multiple times). Need a queue/lock pattern:
```ts
let refreshPromise: Promise<...> | null = null;

if (refreshPromise) return refreshPromise;
refreshPromise = doRefresh();
refreshPromise.finally(() => refreshPromise = null);
```

### 8. `src/app/(public)/shop/cart/page.tsx:126-136` — fetchUserData never checks auth failure
```ts
const response = await authFetch("/user/get-user");
const data = await response.json();
if (response.ok) { setUser(data); }
```
If 401, `data` is an error object, not user data. The code continues without guarding against `user.email` being undefined (used in `handlePayment` line 235). Payment initialization will fail silently.

### 9. `src/app/(public)/shop/cart/page.tsx:192-274` — handlePayment uses hardcoded exchange rates
Lines 174-176:
```ts
if (currency === "GBP") return price / 2000;
if (currency === "USD") return price / 1500;
return price;
```
Rates are hardcoded (NGN 2000 = GBP 1, NGN 1500 = USD 1). These go out of date. Should be fetched from an exchange rate API or backend.

### 10. `src/components/blog/blog-suggestions.tsx` — Generates slugs from title instead of API
If blog slugs are generated client-side from the title, they won't match the API's slug generation logic. Should use the `slug` field from the API response.

### 11. `src/components/blog/blog-list.tsx` — Uses hardcoded blog list fallback
If the API fetch fails, falls back to a hardcoded array of blog posts. This static data goes out of sync with the CMS.

### 12. `src/app/(public)/contact/contact-hero-section.jsx` — Contact form submit not implemented
The contact form renders UI but has no submit handler connected to any API endpoint. Form submissions are silently dropped.

### 13. `src/components/header/mobile-header.tsx` — Broken factory link
Likely uses `/our-factory` path which doesn't exist (should be `/factory`).

### 14. `src/components/admin/aside/aside.tsx:99` — Admin logout doesn't clear in-memory token
```ts
fetch(`${API_BASE_URL}/admin/logout`, { method: "POST", credentials: "include" });
```
Calls backend logout but never calls `clearAccessToken()` from token-store. The in-memory token persists until page reload.

### 15. `src/components/header/header.tsx` — Logout not using token-store
Uses raw `fetch` instead of calling the logout API with proper token handling:
```ts
await fetch(`${API_BASE_URL}/auth/logout`, { method: "POST", credentials: "include" });
window.location.href = "/";
```
Never calls `clearAccessToken()`. Token persists in memory.

### 16. Missing metadata exports on public pages
Pages like `/about`, `/contact`, `/FAQs`, `/privacy-policy`, `/terms-conditions`, `/security` likely have no `export const metadata = { ... }` for SEO. Without metadata, these pages get generic titles in search results.

### 17. `src/app/(public)/shop/[[...slug]]/page.tsx` — No error boundary for product fetch failures
Line 223-228: if product fetch fails, `product` is `null` and passed to `<ProductDetails slug={slugArray} product={product ?? []} />`. The component receives an empty array as product. If it tries to access `product.imageUrl`, it crashes.

---

## MEDIUM

### 18. `src/app/(public)/login/page.tsx` — No visible success banner
The URL param `?success=...` is read but not rendered as a visible banner anywhere in the current code.

### 19. `src/app/(public)/update-profile/page.tsx` — After save, user stays on form
The `handleSubmit` shows success notification but never redirects to `/shop` or home. User fills their profile but stays on the form.

### 20. `src/app/(public)/order/page.tsx:41` — Missing Suspense boundary
Uses `useSearchParams()` via `searchParams?.toString()` but may not be wrapped in `<Suspense>` (check parent component).

### 21. `src/app/(public)/shop/cart/page.tsx:192-274` — handlePayment doesn't handle 401
If `authFetch("/orders")` returns 401, the function falls through to error handling at line 226-231. But the login page redirect happens inside `authFetch`'s refresh logic, not in the component. If refresh fails, the API call returns 401 but the component only shows a notification, doesn't redirect.

### 22. `src/components/shop/product-details.tsx` — Buy Now / Add to Cart error states
The `handleAddToCart` catches errors but only shows a generic notification. Doesn't distinguish between auth failure (should redirect to login), network error (should retry), and stock error (should show specific message).

### 23. `src/app/(public)/payment-success/page.tsx` — No auth check on page load
Payment success page should verify the user is logged in (the order belongs to them) before showing confirmation. Without this, anyone who guesses the URL can see order confirmations.

### 24. `src/lib/fetchCategories.ts` — Cache revalidation at component level
Uses `next: { revalidate: 300 }` for category fetches. This is the Next.js Data Cache — it's for `fetch` in Server Components. In Client Components, this option has no effect. The revalidation won't work as expected.

### 25. `src/middleware.ts` — Admin token verification on every admin request
The middleware reads `adminToken` cookie and verifies JWT on EVERY admin navigation. This is a performance hit. The middleware should only check token existence, not verify the JWT (that's the backend's job).

### 26. `src/app/(Admin)/admin/page.tsx:43` — Admin login doesn't handle refresh token
The admin login page stores the access token but doesn't handle the refresh token flow. If the admin session expires, the in-memory token is gone and the user must re-login.

### 27. `src/components/header/header.tsx` — Header duplicate for mobile/desktop
Two separate `<header>` elements with duplicated logic (desktop and mobile). Changes to auth state handling must be made in both. Common pattern is a single responsive header.

### 28. Shared image skeleton components have no `alt` text fallback
The banner components (`cotton-shirts-banner`, `special-offer-banner`, `new-arrivals-banner`) use inline skeleton components. If the `<Image>` inside has no meaningful `alt` text, accessibility is degraded.

---

## LOW

### 29. `src/components/header/header.tsx` — Logout icon uses LogOut from lucide but button text uses "Logout"
Minor inconsistency — should be consistent (either "Logout" or "Sign out").

### 30. `src/app/(public)/order/page.tsx` — Console.log debugging left in
Line 96: `console.log("Responses from fetch:", res)` — leftover debug log.

### 31. `src/app/(public)/update-profile/page.tsx` — Console.log debugging left in
Line 119: `console.log("User data fetched successfully:", userData)` — leftover debug log.

### 32. `src/app/(Admin)/admin/page.tsx` — Comment annotation
Line 1: `"use client"; // <== Required if you're using Next.js App Router` — unnecessary comment.

### 33. `src/components/admin/products/product-tabs.tsx` — May have unused imports
Several admin components likely import but don't use certain modules (icons, components).

### 34. No loading.tsx files for all route segments
Some route segments in `(public)/` may be missing `loading.tsx` files, resulting in no loading state during page transitions.

### 35. `src/components/other-authentication-method/google.tsx` — next-auth signIn with callbackUrl
```tsx
signIn("google", { callbackUrl: "/other-verification-method" })
```
After Google login, user goes to `/other-verification-method` which is a 2FA recovery code page — seems wrong. Google-authenticated users should go to home or shop.

### 36. `src/app/api/auth/[...nextauth]/` — NextAuth configuration
If next-auth stores sessions in a database, but the database is not configured, Google sign-in will fail at runtime. Need to verify the NextAuth configuration matches the deployed environment.

---

## CROSS-CUTTING

### Auth Flow Issues
- **Token lost on page refresh**: In-memory token is lost on full page reload (e.g., `window.location.href`, manual refresh). The httpOnly refresh cookie should handle this, but only if the refresh endpoint returns a new accessToken (backend was recently updated to do this).
- **authFetch handles 401 + refresh silently**: If refresh fails, the 401 response is returned to the component. No single consistent error handling — each component handles it differently.

### Missing User Experience
- No global loading state for auth initialization
- Error messages are inconsistent (sometimes notification popup, sometimes inline text, sometimes console)
- No offline/downtime detection (if API is down, app shows broken UI instead of a friendly message)

### Performance
- No image optimization strategy beyond Next.js `<Image>` component — some images may lack `priority` on above-the-fold content
- No bundle analysis — large third-party icon imports (lucide-react + react-icons) add bundle weight
- No ISR or caching strategy on shop pages

### Accessibility
- No `aria-label` on icon-only buttons (cart icon, search icon, hamburger menu)
- No focus trap on mobile menu dropdowns
- No keyboard navigation on dropdown menus (Man, Woman dropdowns)

### SEO
- Missing meta descriptions on most pages
- Missing Open Graph tags for social sharing
- No canonical URLs
- No structured data (JSON-LD) for products, blog posts
