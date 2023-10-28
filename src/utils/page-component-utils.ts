import { cookies } from 'next/headers'
import { verifyToken } from './jwt-utils'

export async function checkIfAuthenticated() {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')?.value

  return token && (await verifyToken(token))
}
