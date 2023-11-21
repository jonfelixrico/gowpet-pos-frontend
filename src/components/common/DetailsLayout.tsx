import { Url } from '@/types/Url'
import { Box, Flex, FlexProps, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export type DetailsLayoutProps = {
  children?: ReactNode
  href: Url
  header?: ReactNode
} & FlexProps

export default function DetailsLayout({
  children,
  href,
  header,
  ...flexProps
}: DetailsLayoutProps) {
  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <Flex gap={2} align="center">
        <Link href={href} data-cy="back">
          <IconButton isRound aria-label="Back">
            <IoIosArrowBack />
          </IconButton>
        </Link>

        <Box flex={1}>{header}</Box>
      </Flex>
      <Box flex={1}>{children}</Box>
    </Flex>
  )
}
