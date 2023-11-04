import { getAuthToken } from '../utils/auth-util'
import { FetchWrapperOptions, fetchWrapper } from '../utils/fetch-utils'

export function apiFetch(
  input: string,
  init?: RequestInit,
  options?: FetchWrapperOptions
) {
  // TODO take this value from env vars
  const url = new URL(input, process.env.BACKEND_URL)

  return fetchWrapper(
    url.toString(),
    {
      ...(init ?? {}),
      headers: {
        ...(init?.headers ?? {}),
        Authorization: `Bearer ${getAuthToken()}`,
      },
    },
    options
  )
}

export interface ApiResponse<T> extends Response {
  data: T
}

export async function apiFetchData<T = any>(
  input: string,
  init?: RequestInit,
  options?: FetchWrapperOptions
): Promise<ApiResponse<T>> {
  const response = await apiFetch(input, init, options)

  Object.assign(response, {
    data: await response.json(),
  })

  return response as ApiResponse<T>
}
