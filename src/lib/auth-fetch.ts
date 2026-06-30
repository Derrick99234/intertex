import { API_BASE_URL } from "./constants";
import { getAccessToken, setAccessToken } from "./token-store";

type AuthFetchOptions = RequestInit & {
  refreshPath?: "/auth/refresh" | "/admin/refresh";
  next?: {
    revalidate?: number;
  };
};

export async function authFetch(
  path: string,
  options: AuthFetchOptions = {},
) {
  const { refreshPath = "/auth/refresh", headers, ...rest } = options;
  const requestHeaders = new Headers(headers);

  const token = getAccessToken();
  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const makeRequest = () =>
    fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: requestHeaders,
      credentials: "include",
    });

  let response = await makeRequest();
  if (response.status !== 401) {
    return response;
  }

  const refreshResponse = await fetch(`${API_BASE_URL}${refreshPath}`, {
    method: "POST",
    credentials: "include",
  });

  if (!refreshResponse.ok) {
    return response;
  }

  const refreshData = await refreshResponse.json();
  if (refreshData.accessToken) {
    setAccessToken(refreshData.accessToken);
    requestHeaders.set("Authorization", `Bearer ${refreshData.accessToken}`);
  }

  response = await makeRequest();
  return response;
}
