import QrCode from '@/components/barcode/generator/QrCode'
import { DataAttributes } from '@/types/DataAttributes'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { SavedBilling, SavedBillingItem } from '@/types/SavedBilling'
import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { ForwardedRef, forwardRef } from 'react'

function BillingItem({
  item,
  itemNo,
  ...dataAttrs
}: {
  item: SavedBillingItem
  itemNo: number
} & DataAttributes) {
  const { catalogItem, price, quantity } = item
  return (
    <Flex direction="column" {...dataAttrs}>
      <Text>
        {itemNo} <span data-cy="name">{catalogItem.name}</span>
      </Text>
      <Flex justify="space-between" fontSize="0.9em">
        <Text>
          PHP <span data-cy="price">{price}</span> x{' '}
          <span data-cy="quantity">{quantity}</span>
        </Text>

        <Text>
          PHP <span data-cy="amount">{price * quantity}</span>
        </Text>
      </Flex>
    </Flex>
  )
}

export type BillingReceiptProps = {
  billing: SavedBilling
  settings: ReceiptSettings
  width: number
} & DataAttributes

export default forwardRef(function BillingReceipt(
  { billing, settings, width, ...dataAttrs }: BillingReceiptProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { items, serialNo } = billing

  const totalAmount = items.reduce(
    (acc, val) => acc + val.price * val.quantity,
    0
  )
  const totalQuantity = items.reduce((acc, { quantity }) => acc + quantity, 0)

  return (
    <Flex
      width={width}
      direction="column"
      gap={2}
      fontSize={12}
      {...dataAttrs}
      ref={ref}
    >
      <Box>
        <Text
          data-cy="header"
          textAlign="center"
          fontSize="1.5em"
          fontWeight="bold"
        >
          {settings.header}
        </Text>
        <Text data-cy="contact-no" textAlign="center">
          {settings.contactNo}
        </Text>
        <Text data-cy="address" textAlign="center">
          {settings.address}
        </Text>
      </Box>

      <Flex direction="column" gap={1}>
        {items.map((item, index) => (
          <BillingItem
            data-cy="billing-item"
            item={item}
            key={item.catalogItem.id}
            itemNo={index + 1}
          />
        ))}
      </Flex>

      <Box>
        <Text>
          TOTAL: PHP <span data-cy="total-amount">{totalAmount}</span>
        </Text>
        <Text>
          # OF ITEMS PURCHASED:{' '}
          <span data-cy="total-quantity">{totalQuantity}</span>
        </Text>
        <Text>
          BILLING #{' '}
          <span data-cy="serial">{String(serialNo).padStart(4, '0')}</span>
        </Text>
      </Box>

      <Box>
        <Text data-cy="sns-message" textAlign="center">
          {settings.snsMessage}
        </Text>
        <Center data-cy="sns-qr">
          <QrCode value={settings.snsLink} />
        </Center>
      </Box>

      <Text textAlign="center">Thank you and come again!</Text>

      <Box>
        <Text textAlign="center">{new Date().toLocaleString()}</Text>
        <Text textAlign="center">CUSTOMER COPY</Text>
      </Box>
    </Flex>
  )
})
