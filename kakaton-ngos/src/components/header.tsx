import React from 'react';
import { Image, Box, Flex, HStack, Link, IconButton, useDisclosure, Stack, Button, Heading } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Header: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bgGradient="linear(to-r, teal.600, blue.600)" px={4} shadow="lg" position="sticky" top={0} zIndex={1} w="100%" maxW="100vw" boxSizing='border-box'>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />

                <HStack spacing={8} alignItems="center">
                    <Image
                        src="/logo.webp"
                        alt="Logo"
                        mx="auto"
                        boxSize="32px"
                        borderRadius="full"
                        boxShadow="lg"
                    />
                    <Heading as="h1" size="lg" color="white">

                        <Link as={RouterLink} to="/">
                            FundConnect
                        </Link>
                    </Heading>
                    <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <Link as={RouterLink} to="/" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Strona główna
                        </Link>
                        <Link as={RouterLink} to="/add/company" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Dodaj swoja organizację
                        </Link>
                        <Link as={RouterLink} to="/add/foundation" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Dodaj swoja fundację
                        </Link>
                        <Link as={RouterLink} to="/search/foundation" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Przegladaj fundacje
                        </Link>
                        <Link as={RouterLink} to="/search/company" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Przegladaj organizacje
                        </Link>
                    </HStack>
                </HStack>

                {/* <Flex alignItems="center">
                    <Button
                        as={RouterLink}
                        to="/login"
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        _hover={{ bg: 'blue.400', color: 'white' }}
                    >
                        Zaloguj się
                    </Button>
                </Flex> */}
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as="nav" spacing={4}>
                        <Link as={RouterLink} to="/" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Strona główna
                        </Link>
                        <Link as={RouterLink} to="/create-organization" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Załóż organizację
                        </Link>
                        <Link as={RouterLink} to="/create-foundation" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Załóż fundację
                        </Link>
                        <Link as={RouterLink} to="/search" px={2} py={1} rounded="md" _hover={{ bg: 'teal.400' }} color="white">
                            Wyszukaj
                        </Link>
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};

export default Header;