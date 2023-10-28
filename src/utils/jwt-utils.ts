import { verify } from 'jsonwebtoken'
import { fetchWrapper } from './fetch-utils'

async function getPublicKey() {
  // TODO cache the response
  const response = await fetchWrapper(
    'http://localhost:3005/authenticate/publicKey'
  )

  return await response.text()
}

export async function verifyToken(token: string) {
  const key = await getPublicKey()

  return await new Promise((resolve) => {
    verify(token, key, {}, (err) => {
      if (err) {
        // TODO use a proper logger
        console.debug(err)
        resolve(false)
        return
      }

      resolve(true)
    })
  })
}
