import { Box, Flex, IconButton, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from 'react-icons/pi'
import { UrlObject } from 'url'

export type Url = UrlObject | string

export function PaginationControls({
  pageCount,
  pageNo,
  hrefBuilder,
}: {
  pageNo: number
  pageCount: number
  hrefBuilder: (pageNo: number) => Url
}) {
  const isOnFirstPage = pageNo === 1
  const isOnLastPage = pageNo === pageCount

  return (
    <Flex gap={3} align="center">
      <Box data-cy="first">
        <Link href={hrefBuilder(1)} prefetch={false}>
          <IconButton aria-label="First page" isDisabled={isOnFirstPage}>
            <PiCaretDoubleLeftBold />
          </IconButton>
        </Link>
      </Box>

      <Box data-cy="prev">
        <Link href={hrefBuilder(pageNo - 1)} prefetch={!isOnFirstPage}>
          <IconButton aria-label="Prev page" isDisabled={isOnFirstPage}>
            <PiCaretLeftBold />
          </IconButton>
        </Link>
      </Box>

      <Spacer />

      <Text>{`Page ${pageNo} of ${pageCount}`}</Text>

      <Spacer />

      <Box data-cy="next">
        <Link href={hrefBuilder(pageNo + 1)} prefetch={!isOnLastPage}>
          <IconButton aria-label="Next page" isDisabled={isOnLastPage}>
            <PiCaretRightBold />
          </IconButton>
        </Link>
      </Box>

      <Box data-cy="last">
        <Link href={hrefBuilder(pageCount)} prefetch={false}>
          <IconButton aria-label="Last page" isDisabled={isOnLastPage}>
            <PiCaretDoubleRightBold />
          </IconButton>
        </Link>
      </Box>
    </Flex>
  )
}
