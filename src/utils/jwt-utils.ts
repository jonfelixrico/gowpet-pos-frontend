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

  await new Promise((resolve, reject) => {
    verify(token, key, {}, (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve(true)
    })
  })
}
