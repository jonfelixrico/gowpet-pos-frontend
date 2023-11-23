import { DataAttributes } from '@/types/DataAttributes'
import { ReceiptSettings } from '@/types/ReceiptSetings'
import { SavedBilling, SavedBillingItem } from '@/types/SavedBilling'
import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { ForwardedRef, forwardRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

function BillingItem({
  item,
  itemNo,
}: {
  item: SavedBillingItem
  itemNo: number
}) {
  const { catalogItem, price, quantity } = item
  return (
    <Flex direction="column">
      <Text>
        {itemNo} {catalogItem.name}
      </Text>
      <Flex justify="space-between" fontSize="0.9em">
        <Text>
          PHP {price} x {quantity}
        </Text>

        <Text>PHP {price * quantity}</Text>
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
        <Text textAlign="center" fontSize="1.5em" fontWeight="bold">
          {settings.header}
        </Text>
        <Text textAlign="center">{settings.contactNo}</Text>
        <Text textAlign="center">{settings.address}</Text>
      </Box>

      <Flex direction="column" gap={1}>
        {items.map((item, index) => (
          <BillingItem
            item={item}
            key={item.catalogItem.id}
            itemNo={index + 1}
          />
        ))}
      </Flex>

      <Box>
        <Text>TOTAL: PHP {totalAmount}</Text>
        <Text># OF ITEMS PURCHASED: {totalQuantity}</Text>
        <Text>BILLING # {String(serialNo).padStart(4)}</Text>
      </Box>

      <Box>
        <Text textAlign="center">{settings.snsMessage}</Text>
        <Center>
          <QRCodeSVG value={settings.snsLink} />
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
