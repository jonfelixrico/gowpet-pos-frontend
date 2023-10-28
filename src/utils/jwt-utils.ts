import { fetchWrapper } from './fetch-utils'
import { importSPKI, jwtVerify } from 'jose'

async function getPublicKey() {
  // TODO cache the response
  const response = await fetchWrapper(
    'http://localhost:3005/authenticate/publicKey'
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
