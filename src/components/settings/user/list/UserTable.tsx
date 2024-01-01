import User from '@/types/User'
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

export default function UserTable({ users }: { users: User[] }) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Username</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map(({ username }) => (
            <Tr key={username} data-username={username}>
              <Td>{username}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
