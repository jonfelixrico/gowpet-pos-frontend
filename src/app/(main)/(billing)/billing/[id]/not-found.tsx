import { Button, Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function Billing404() {
  // TODO impl the actual logic here

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      height="full"
      width="full"
      data-cy="not-found"
      gap={3}
    >
      <Text fontSize="2xl">
        The billing that you tried to access does not exist
      </Text>
      <Link href="/billing">
        <Button colorScheme="blue" variant="ghost">
          Go back to the billing list
        </Button>
      </Link>
    </Flex>
  )
}
