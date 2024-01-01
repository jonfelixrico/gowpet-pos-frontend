'use server'

import { apiFetch } from '@/server-utils/resource-api-util'
import { Credentials } from '@/types/login-types'

export async function createUser(credentials: Credentials) {
  await apiFetch('/user', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // TODO revalidate cache for list page
}
