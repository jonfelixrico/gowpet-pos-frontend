import { fetchWrapper } from '../utils/fetch-utils'
import { importSPKI, jwtVerify } from 'jose'

async function getPublicKey() {
  // TODO cache the response
  const response = await fetchWrapper(
    new URL('/authenticate/publicKey', process.env.BACKEND_URL).toString()
  )

  const key = await response.text()
  return await importSPKI(key, 'RS256')
}

export async function verifyToken(token: string) {
  const key = await getPublicKey()

  try {
    await jwtVerify(token, key)
    return true
  } catch (e) {
    // TODO polish this logging
    console.debug(e)
    return false
  }
}
