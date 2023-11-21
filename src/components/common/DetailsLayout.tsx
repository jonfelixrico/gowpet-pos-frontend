import { Url } from '@/types/Url'
import { Box, Flex, FlexProps, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function DetailsLayout({
  children,
  href,
  header,
  ...flexProps
}: { children: ReactNode; href: Url; header?: ReactNode } & FlexProps) {
  return (
    <Flex {...flexProps} direction="column" gap={2}>
      <Flex gap={2}>
        <Link href={href}>
          <IconButton isRound variant="ghost" aria-label="Back">
            <IoIosArrowBack />
          </IconButton>
        </Link>

        <Box flex={1}>{header}</Box>
      </Flex>
      <Box flex={1}>{children}</Box>
    </Flex>
  )
}
