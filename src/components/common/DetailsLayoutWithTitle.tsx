import { ReactNode } from 'react'
import DetailsLayout, { DetailsLayoutProps } from './DetailsLayout'
import { Box, Flex, Text } from '@chakra-ui/react'

export type DetailsLayoutWithTitleProps = {
  title: string
  actions?: ReactNode
} & Omit<DetailsLayoutProps, 'header'>

export default function DetailsLayoutWithTitle({
  title,
  actions,
  ...props
}: DetailsLayoutWithTitleProps) {
  const header = (
    <Flex justify="space-between" align="center">
      <Text fontWeight="bold" fontSize="xl" data-cy="title">
        {title}
      </Text>

      <Box>{actions}</Box>
    </Flex>
  )
  return <DetailsLayout header={header} {...props} />
}
