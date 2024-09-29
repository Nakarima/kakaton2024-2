import { Box, Button, Text, Heading, Stack, Image } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom";

export default () => {
    return (
        <Box
          textAlign="center"
          py={10}
          pt={0}
          px={6}
          boxSizing="border-box"
          bgGradient="linear(to-r, teal.500, blue.500)"
          color="white"
          w="100%"
          h="100%"
          flexGrow={2}
        >
          <Box mb={10} mt={4}>
            <Image
              src="/logo.webp"
              alt="Logo"
              mx="auto"
              boxSize="150px"
              borderRadius="full"
              boxShadow="lg"
            />
          </Box>
          <Heading as="h1" size="2xl" mb={6} textShadow="2px 2px teal">
            Witaj w Aplikacji Łączącej Organizacje z Fundacjami
          </Heading>
          <Text fontSize="xl" mb={6} px={8}>
            Naszym celem jest stworzenie platformy, która umożliwia łatwe połączenie organizacji z fundacjami, aby razem mogli wspierać lokalne i globalne inicjatywy. <br/>Dołącz do nas już dziś!
          </Text>
    
          <Stack direction="column" spacing={4} align="center">
            <Button
              as={RouterLink}
              to="/add/company"
              colorScheme="teal"
              size="lg"
              boxShadow="xl"
            >
              Załóż konto organizacji
            </Button>
    
            <Button
              as={RouterLink}
              to="/add/foundation"
              colorScheme="blue"
              size="lg"
              boxShadow="xl"
            >
              Załóż konto fundacji
            </Button>
          </Stack>
    
          <Box mt={10}>
            <Text fontSize="lg" px={8}>
              Pomóż nam tworzyć lepszy świat, łącząc organizacje non-profit z fundacjami, które wspierają ich cele. Razem możemy budować silniejsze społeczności i wspierać innowacyjne inicjatywy na całym świecie.
            </Text>
          </Box>
        </Box>
      );
}