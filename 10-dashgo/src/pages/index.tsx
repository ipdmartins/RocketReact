import { Button, Flex, FormControl, FormLabel, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function Home() {
  return (
    <>
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth="360px"
          background="gray.800"
          padding={8}
          borderRadius={8}
          flexDirection="column"
        >
          <Stack spacing={4}>
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Senha" />
          </Stack>
          <Button type="submit" marginTop={6} colorScheme="blue" size="lg">
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
