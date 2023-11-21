import { apiFetchData } from '@/server-utils/resource-api-util'
import { SavedBilling } from '@/types/SavedBilling'
import EscPosEncoder from 'esc-pos-encoder'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _: NextRequest,
  context: { params: Record<string, string> }
) {
  const { data } = await apiFetchData<SavedBilling>(
    `/billing/${context.params.id}`
  )
  const { items, serialNo } = data

  const encoder = new EscPosEncoder().initialize()

  encoder.line(`Receipt no. ${serialNo}`)

  for (const { catalogItem, price, quantity } of items) {
    encoder.line(
      `${catalogItem.name} - ${price} x ${quantity} = ${price * quantity}`
    )
  }

  const encoded = encoder.encode()
  return NextResponse.json(encoded.toString().split(','))
}
