import { sprintf } from 'sprintf-js'

function inRange(toTest: number, min: number, max: number) {
  return toTest >= min && toTest <= max
}

export class FetchError extends Error {
  constructor(public response: Response) {
    super(sprintf('[%d]: %s', response.status, response.statusText), {
      cause: response,
    })
  }

  public get is5XX() {
    return inRange(this.response.status, 500, 599)
  }

  public get is4XX() {
    return inRange(this.response.status, 400, 499)
  }
}

export interface FetchWrapperOptions<T = undefined> {
  validator?: (response: Response) => boolean
  dataTransformer?: (response: Response) => T | Promise<T>
}

const defaultValidator = ({ status }: Response) => inRange(status, 200, 299)

export async function fetchWrapper<T = undefined>(
  input: RequestInfo,
  init?: RequestInit,
  options?: FetchWrapperOptions<T>
): Promise<ApiResponse<T>> {
  const response = await fetch(input, init)

  const validator = options?.validator ?? defaultValidator
  if (!validator(response)) {
    throw new FetchError(response)
  }

  if (options?.dataTransformer) {
    Object.assign(response, {
      data: await options.dataTransformer(response),
    })
  }

  return response as ApiResponse<T>
}

export interface ApiResponse<T> extends Response {
  data: T
}

export async function fetchData<T>(
  input: string,
  init?: RequestInit,
  options?: FetchWrapperOptions
) {
  return fetchWrapper<T>(input, init, {
    ...(options ?? {}),
    dataTransformer: (response) => response.json(),
  })
}
