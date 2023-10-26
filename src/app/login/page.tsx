import { Card, CardBody, Flex, Heading } from "@chakra-ui/react";
import LoginForm from "./LoginForm";

export default function Login() {
  return <Flex direction="column" align="center" gap="2" justify="center" height="100dvh">
    <Card>
      <CardBody>
        <LoginForm />
      </CardBody>
    </Card>
  </Flex>
}