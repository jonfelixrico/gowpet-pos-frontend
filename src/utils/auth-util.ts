import { cookies } from 'next/headers'

export function getAuthToken(): string | undefined {
  const cookiesStore = cookies()
  return cookiesStore.get('token')?.value
}
