'use server'

import { apiFetch } from '@/server-utils/resource-api-util'
import { Credentials } from '@/types/login-types'
import { revalidatePath } from 'next/cache'

export async function createUser(credentials: Credentials) {
  await apiFetch('/user', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  revalidatePath('/settings/user')
}
