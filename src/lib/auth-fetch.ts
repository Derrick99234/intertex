import { API_BASE_URL } from "./constants";

type AuthFetchOptions = RequestInit & {
  refreshPath?: "/auth/refresh" | "/admin/refresh";
  next?: {
    revalidate?: number;
  };
};

async function refreshSession(refreshPath: string) {
  return fetch(`${API_BASE_URL}${refreshPath}`, {
    method: "POST",
    credentials: "include",
  });
}

export async function authFetch(
  path: string,
  options: AuthFetchOptions = {},
) {
  const { refreshPath = "/auth/refresh", headers, ...rest } = options;
  const requestHeaders = new Headers(headers);

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

  const refreshResponse = await refreshSession(refreshPath);
  if (!refreshResponse.ok) {
    return response;
  }

  response = await makeRequest();
  return response;
}
