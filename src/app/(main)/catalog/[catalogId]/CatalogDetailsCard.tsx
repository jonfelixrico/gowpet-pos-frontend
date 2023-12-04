import Barcode from '@/components/barcode/generator/Barcode'
import QrCode from '@/components/barcode/generator/QrCode'
import { CatalogItem } from '@/types/CatalogItem'
import { Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import { Else, If, Then } from 'react-if'

export default function CatalogDetailsCard({
  catalogItem,
}: {
  catalogItem: Omit<CatalogItem, 'type' | 'id'>
}) {
  const { name, price, code, codeType } = catalogItem

  return (
    <Card>
      <CardBody
        as={Flex}
        gap={2}
        direction={{
          base: 'column',
          sm: 'row',
        }}
      >
        <Flex direction="column" gap={2} flex={1}>
          <Flex gap={2}>
            <Heading size="sx">Name:</Heading>
            <Text data-cy="name">{name}</Text>
          </Flex>

          <Flex gap={2}>
            <Heading size="sx">Price:</Heading>
            <Text data-cy="price">{price}</Text>
          </Flex>
        </Flex>

        <If condition={code}>
          <Then>
            <Flex
              direction="column"
              flex={{
                base: 1,
                sm: 0.5,
                md: 0.3,
              }}
              gap={1}
              data-cy="barcode"
            >
              <If condition={codeType === 'CUSTOM'}>
                <Then>
                  <Box display="contents" data-type="CUSTOM">
                    <QrCode value={code as string} />
                  </Box>
                </Then>

                <Else>
                  <Box display="contents" data-type="UPC">
                    <Barcode value={code as string} />
                  </Box>
                </Else>
              </If>

              <Text fontSize="xs" textAlign="center" data-cy="code">
                {code as string}
              </Text>
            </Flex>
          </Then>
        </If>
      </CardBody>
    </Card>
  )
}
