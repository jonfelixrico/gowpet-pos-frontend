import { inRange } from 'lodash'
import { sprintf } from 'sprintf-js'

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

export interface FetchWrapperOptions {
  validator?: (response: Response) => boolean
}

const defaultValidator = ({ status }: Response) => inRange(status, 200, 299)

export async function fetchWrapper(
  input: RequestInfo,
  init?: RequestInit,
  options?: FetchWrapperOptions
) {
  const response = await fetch(input, init)

  const validator = options?.validator ?? defaultValidator
  if (!validator(response)) {
    throw new FetchError(response)
  }

  return response
}
