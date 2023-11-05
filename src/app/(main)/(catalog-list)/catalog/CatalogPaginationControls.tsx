import { Flex, IconButton, Spacer, Text } from '@chakra-ui/react'
import Link from 'next/link'
import {
  PiCaretDoubleLeftBold,
  PiCaretDoubleRightBold,
  PiCaretLeftBold,
  PiCaretRightBold,
} from 'react-icons/pi'

export function CatalogPaginationControls({
  pageCount,
  pageNo,
  additionalQuery,
}: {
  pageNo: number
  pageCount: number
  additionalQuery?: Record<string, string>
}) {
  const isOnFirstPage = pageNo === 1
  const isOnLastPage = pageNo === pageCount

  function buildHref(pageNo: number) {
    return {
      pathname: '/catalog',
      query: {
        ...additionalQuery,
        pageNo,
      },
    }
  }

  return (
    <Flex gap={3} align="center">
      <Link href={buildHref(0)} prefetch={false} data-cy="first">
        <IconButton aria-label="First page" isDisabled={isOnFirstPage}>
          <PiCaretDoubleLeftBold />
        </IconButton>
      </Link>

      <Link
        href={buildHref(pageNo - 1)}
        prefetch={!isOnFirstPage}
        data-cy="prev"
      >
        <IconButton aria-label="Prev page" isDisabled={isOnFirstPage}>
          <PiCaretLeftBold />
        </IconButton>
      </Link>

      <Spacer />

      <Text>{`Page ${pageNo} of ${pageCount}`}</Text>

      <Spacer />

      <Link
        href={buildHref(pageNo + 1)}
        prefetch={!isOnLastPage}
        data-cy="next"
      >
        <IconButton aria-label="Next page" isDisabled={isOnLastPage}>
          <PiCaretRightBold />
        </IconButton>
      </Link>

      <Link href={buildHref(pageCount - 1)} prefetch={false} data-cy="last">
        <IconButton aria-label="Last page" isDisabled={isOnLastPage}>
          <PiCaretDoubleRightBold />
        </IconButton>
      </Link>
    </Flex>
  )
}
