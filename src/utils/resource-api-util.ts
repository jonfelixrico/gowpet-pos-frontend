import { getAuthToken } from './auth-util'
import { FetchWrapperOptions, fetchWrapper } from './fetch-utils'

export function apiFetch(
  input: string,
  init?: RequestInit,
  options?: FetchWrapperOptions
) {
  // TODO take this value from env vars
  const url = new URL(input, 'http://localhost:3005')

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
