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

  // We can't use response.json directly because it can't seem to be able to handle null
  const text = await response.text()
  Object.assign(response, {
    data: text.length === 0 ? null : JSON.parse(text),
  })

  return response as ApiResponse<T>
}
