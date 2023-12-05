import type { useState } from 'react'

export type UseStateOutput<T> = ReturnType<typeof useState<T>>
