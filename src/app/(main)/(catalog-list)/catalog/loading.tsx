import {
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { range } from 'lodash'

function ItemSkeleton() {
  return (
    <Tr>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
      <Td>
        <Skeleton height="20px" />
      </Td>
    </Tr>
  )
}

export default function CatlaogListLoading() {
  return (
    <TableContainer overflowY="auto" width="full" height="full">
      <Table>
        <Thead position="sticky" top={0} backgroundColor="white">
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Price</Th>
            {/* intended to be empty; this is for the buttons */}
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {range(30).map((idx) => (
            <ItemSkeleton key={idx} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
