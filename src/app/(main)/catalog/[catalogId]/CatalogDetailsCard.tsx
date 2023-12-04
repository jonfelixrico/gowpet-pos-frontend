import Barcode from '@/components/barcode/generator/Barcode'
import QrCode from '@/components/barcode/generator/QrCode'
import { CatalogItem } from '@/types/CatalogItem'
import { Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react'
import { Else, If, Then } from 'react-if'

export default function CatalogDetailsCard({
  catalogItem,
}: {
  catalogItem: CatalogItem
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
            <Heading size="sx" data-cy="price">
              Price:
            </Heading>
            <Text data-cy="price">{price}</Text>
          </Flex>
        </Flex>

        <If condition={code}>
          <Then>
            <Flex
              direction="column"
              flex={{
                base: 1,
                sm: 0.3,
              }}
              gap={1}
            >
              <If condition={codeType === 'CUSTOM'}>
                <Then>
                  <QrCode value={code as string} />
                </Then>

                <Else>
                  <Barcode value={code as string} />
                </Else>
              </If>

              <Text fontSize="xs" textAlign="center">
                {code as string}
              </Text>
            </Flex>
          </Then>
        </If>
      </CardBody>
    </Card>
  )
}
