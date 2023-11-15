import { EMPTY_FN } from '@/utils/misc-utills'
import { Flex, IconButton, Text } from '@chakra-ui/react'
import { MdAdd, MdRemove } from 'react-icons/md'

export default function BillingItemQuantity({
  onDecrement = EMPTY_FN,
  onIncrement = EMPTY_FN,
  quantity = 0,
}: {
  onIncrement?: () => void
  onDecrement?: () => void
  quantity?: number
}) {
  return (
    <Flex direction="column" align="center">
      <Flex gap={3} align="center">
        <IconButton
          data-cy="decrement"
          isRound
          size="xs"
          aria-label="subtract"
          onClick={onDecrement}
          isDisabled={quantity === 1}
        >
          <MdRemove />
        </IconButton>

        <Text data-cy="quantity" fontSize="xl" fontWeight="medium">
          {quantity}
        </Text>

        <IconButton
          data-cy="increment"
          isRound
          size="xs"
          aria-label="add"
          onClick={onIncrement}
        >
          <MdAdd />
        </IconButton>
      </Flex>

      <Text fontSize="xs">{quantity === 1 ? 'unit' : 'units'}</Text>
    </Flex>
  )
}
