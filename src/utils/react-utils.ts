export function makeInputEmitInputEvent<T>(input: HTMLInputElement, value: T) {
  const proto = window.HTMLInputElement.prototype
  if (!proto) {
    throw new Error('window.HTMLInputElement.prototype not found')
  }

  const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set
  if (!setter) {
    throw new Error('Setter not found')
  }

  setter.call(input, value)

  var event = new Event('input', { bubbles: true })
  input.dispatchEvent(event)
}
