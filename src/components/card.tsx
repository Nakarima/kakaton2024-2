import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  VStack,
  HStack,
  Divider,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { StarIcon, CheckCircleIcon, AtSignIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

interface NGOCardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  teamCount: number;
}

interface CompanyCardProps {
  id: string;
  name: string;
  description: string;
  socialImpactStrategy: string;
  totalBudget: number;
  tags: string[];
}

const NGOCard: React.FC<NGOCardProps> = ({ name, description, tags, teamCount, id }) => {
  return (
    <Link to={`/kakaton2024-2/foundation/${id}`}>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="blue.50"
        _hover={{ bg: 'blue.100', shadow: 'lg' }}
        minW={"400px"}
      >
        <Heading fontSize="xl" mb={2}>
          {name} <Tooltip label="NGO"><Icon as={AtSignIcon} color="blue.400" /></Tooltip>
        </Heading>
        <Text mb={4}>{description}</Text>

        <HStack spacing={4} wrap="wrap">
          {tags.map((tag, index) => (
            <Badge key={index} colorScheme="green" variant="solid" fontSize="0.8em">
              {tag}
            </Badge>
          ))}
        </HStack>

        <Divider my={4} />

        <Flex justify="space-between" align="center">
          <Text fontSize="sm" color="gray.500">
            Licznosc zespolu: {teamCount}
          </Text>
          <Icon as={StarIcon} color="yellow.500" />
        </Flex>
      </Box>
    </Link>

  );
};

const CompanyCard: React.FC<CompanyCardProps> = ({ name, description, tags, socialImpactStrategy, totalBudget, id }) => {
  return (
    <Link to={`/kakaton2024-2/org/${id}`}>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="lg"
        bg="purple.50"
        _hover={{ bg: 'purple.100', shadow: 'lg' }}
        minW={"400px"}
      >
        <Heading fontSize="xl" mb={2}>
          {name} <Tooltip label="Firma"><Icon as={CheckCircleIcon} color="purple.400" /></Tooltip>
        </Heading>
        <Text mb={4}>{description}</Text>

        <VStack align="start" spacing={2}>
          <HStack>
            <Icon as={StarIcon} color="purple.500" />
            <Text fontSize="sm" fontWeight="bold">
              Strategia: {socialImpactStrategy}
            </Text>
          </HStack>

          <HStack>
            <Icon as={CheckCircleIcon} color="green.500" />
            <Text fontSize="sm">Całkowity budżet: {totalBudget} PLN</Text>
          </HStack>
          <HStack spacing={4} wrap="wrap">
          {tags.map((tag, index) => (
            <Badge key={index} colorScheme="green" variant="solid" fontSize="0.8em">
              {tag}
            </Badge>
          ))}
        </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export { NGOCard, CompanyCard };
