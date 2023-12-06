import type { Dispatch, SetStateAction } from 'react'

export type ReactState<T> = [T, Dispatch<SetStateAction<T>>]
