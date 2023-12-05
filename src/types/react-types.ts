import type { Dispatch, SetStateAction } from 'react'

export type UseStateOutput<T> = [T, Dispatch<SetStateAction<T>>]
