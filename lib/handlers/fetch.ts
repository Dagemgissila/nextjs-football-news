import { RequestError } from "../http-errors";
import handleError from "./error";

interface FetchOptions extends RequestInit {
  timeout?: number;
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export async function fetchHandler<T>(
  url: string,
  options: FetchOptions = {}
): Promise<ActionResponse<T>> {
  const {
    timeout = 6000,
    headers: customHeaders = {},
    ...restOptions
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers: HeadersInit = { ...defaultHeaders, ...customHeaders };

  const config: RequestInit = {
    headers,
    ...restOptions,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);

    if (!response.ok) {
      throw new RequestError(response.status, `HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    const error = isError(err) ? err : new Error("Unknown error");

    if (error.name === "AbortError") {
      console.log(`Request to ${url} timed out`);
    } else {
      console.log(`Error fetching ${url}: ${error.message}`);
    }

    return handleError(error) as ActionResponse<T>;
  }
}
