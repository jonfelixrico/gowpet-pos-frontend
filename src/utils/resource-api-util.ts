import { getAuthToken } from './auth-util'
import { FetchWrapperOptions, fetchWrapper } from './fetch-utils'

export function apiFetch(
  input: RequestInfo,
  init?: RequestInit,
  options?: FetchWrapperOptions
) {
  return fetchWrapper(
    input,
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
