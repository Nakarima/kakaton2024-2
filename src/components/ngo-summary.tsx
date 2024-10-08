
import React from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    Divider,
    Button,
} from '@chakra-ui/react';
import { NGO } from '../types';
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

interface NGOSummaryProps {
    ngoDTO: NGO;
}

const NGOSummary: React.FC<NGOSummaryProps> = ({ ngoDTO }) => {
    const { ngo } = ngoDTO
    const {id} = useParams<{id:string}>()
    const [query] = useSearchParams()
    const navigate = useNavigate()

    const magic = async () => {
        const res = await fetch(`https://ngos-companies-matcher-gavdo.ondigitalocean.app/matches/ngos/${id}`).then((r) => r.json())

        navigate(`/kakaton2024-2/org/${res._id}?from-match=1`)
    }

    return (
        <Box maxW="4xl" w="100%" mx="auto" p={8} bg="white" borderRadius="lg" boxShadow="lg" mt={6}>

            <VStack spacing={6} align="stretch">
            {query.get('from-match') && <Box><Heading>Its a match!</Heading></Box>}
                <Box>
                    <Heading as="h2" size="lg">{ngo.name}</Heading>
                </Box>

                <Box>
                    <Text>{ngo.description}</Text>
                </Box>

                <Box>
                    <Text>Email: {ngo.email}</Text>
                </Box>

                {!query.get('from-match') && <Button colorScheme='pink' onClick={magic} leftIcon={ <StarIcon />}>Magic Match</Button>}

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Strategia</Heading>
                    <Text><strong>Misja:</strong> {ngo.strategy.mission}</Text>
                    <Text><strong>Wizja:</strong> {ngo.strategy.vision}</Text>

                    <Heading as="h3" size="md" mt={4}>Cele</Heading>
                    <Text>{ngo.strategy.goals.join(', ')}</Text>

                    <Heading as="h3" size="md" mt={4}>Wartości</Heading>
                    <Text>{ngo.strategy.values.join(', ')}</Text>
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Projekty</Heading>
                    {ngo.projects.map((project, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                            <Text><strong>Nazwa:</strong> {project.name}</Text>
                            <Text><strong>Opis:</strong> {project.description}</Text>
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Cele Społeczne i Biznesowe</Heading>
                    <Heading as="h3" size="md" mt={4}>Cele Społeczne</Heading>
                    <Text>{ngo.social_and_business_goals.social_goals.join(', ')}</Text>

                    <Heading as="h3" size="md" mt={4}>Cele Biznesowe</Heading>
                    <Text>{ngo.social_and_business_goals.business_goals.join(', ')}</Text>
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Zespół</Heading>
                    {ngo.team.map((member, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                            <Text><strong>Imię i Nazwisko:</strong> {member.name}</Text>
                            <Text><strong>Stanowisko:</strong> {member.position}</Text>
                            <Text><strong>Doświadczenie:</strong> {member.experience}</Text>
                            <Text><strong>Umiejętności:</strong> {member.skills.join(', ')}</Text>
                        </Box>
                    ))}
                </Box>

            </VStack>
        </Box>
    );
};

export default NGOSummary;
