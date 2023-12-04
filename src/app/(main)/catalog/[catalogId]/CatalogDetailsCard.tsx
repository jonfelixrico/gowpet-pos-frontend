import Barcode from '@/components/barcode/generator/Barcode'
import QrCode from '@/components/barcode/generator/QrCode'
import { CatalogItem } from '@/types/CatalogItem'
import { Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import { Else, If, Then } from 'react-if'

export default function CatalogDetailsCard({
  catalogItem,
}: {
  catalogItem: CatalogItem
}) {
  const { name, price, code, codeType } = catalogItem
  return (
    <Card>
      <CardBody>
        <Flex direction="column" gap={2}>
          <Flex gap={2}>
            <Heading size="sx">Name:</Heading>
            <Text data-cy="name">{name}</Text>
          </Flex>

          <Flex gap={2}>
            <Heading size="sx" data-cy="price">
              Price:
            </Heading>
            <Text data-cy="price">{price}</Text>
          </Flex>

          <If condition={code}>
            <Then>
              <Box>
                <If condition={codeType === 'CUSTOM'}>
                  <Then>
                    <QrCode value={code as string} />
                  </Then>

                  <Else>
                    <Barcode value={code as string} />
                  </Else>
                </If>
              </Box>
            </Then>
          </If>
        </Flex>
      </CardBody>
    </Card>
  )
}
