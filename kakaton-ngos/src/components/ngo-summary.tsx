
import React from 'react';
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Divider,
    Button,
} from '@chakra-ui/react';
import { NGO } from '../types';

const ngoData = {
    ngo: {
        name: 'Fundacja Pomocy',
        description: 'Wsparcie dla osób potrzebujących.',
        strategy: {
            mission: 'Pomaganie w kryzysie.',
            vision: 'Społeczeństwo bez wykluczenia.',
            goals: ['Zwiększenie dostępu do edukacji', 'Wsparcie rodzin'],
            values: ['Empatia', 'Zaangażowanie', 'Transparentność'],
        },
        projects: [
            {
                name: 'Program Wsparcia Dzieci',
                description: 'Wsparcie dzieci w trudnych sytuacjach życiowych.',
                target_group: 'Dzieci z ubogich rodzin',
                start_date: '2024-01-01',
                end_date: '2024-12-31',
                objectives: ['Wsparcie psychologiczne', 'Zwiększenie dostępu do edukacji'],
                status: 'W trakcie realizacji',
                previous_experience: [
                    {
                        project_name: 'Wsparcie dla Seniorów',
                        description: 'Pomoc seniorom w codziennym życiu.',
                        results: '1000 osób skorzystało z pomocy.',
                    }
                ],
            }
        ],
        social_and_business_goals: {
            social_goals: ['Zwiększenie liczby beneficjentów', 'Wsparcie lokalnych społeczności'],
            business_goals: ['Zbieranie funduszy na nowe projekty', 'Zwiększenie liczby darczyńców'],
        },
        team: [
            {
                name: 'Jan Kowalski',
                position: 'Koordynator projektów',
                experience: '5 lat doświadczenia w NGO.',
                skills: ['Zarządzanie projektami', 'Komunikacja'],
                previous_projects: [
                    {
                        project_name: 'Edukacja dla Wszystkich',
                        description: 'Program edukacyjny dla dzieci.',
                    }
                ],
            }
        ]
    },
};

interface NGOSummaryProps {
    ngo: NGO;
}

const NGOSummary: React.FC<NGOSummaryProps> = ({ ngo = ngoData }) => {
    return (
        <Box maxW="4xl" w="100%" mx="auto" p={8} bg="white" borderRadius="lg" boxShadow="lg" mt={6}>

            <VStack spacing={6} align="stretch">

                <Box>
                    <Heading as="h2" size="lg">{ngo.ngo.name}</Heading>
                </Box>

                <Box>
                    <Text>{ngo.ngo.description}</Text>
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Strategia</Heading>
                    <Text><strong>Misja:</strong> {ngo.ngo.strategy.mission}</Text>
                    <Text><strong>Wizja:</strong> {ngo.ngo.strategy.vision}</Text>
                    
                    <Heading as="h3" size="md" mt={4}>Cele</Heading>
                    <Text>{ngo.ngo.strategy.goals.join(', ')}</Text>
                    
                    <Heading as="h3" size="md" mt={4}>Wartości</Heading>
                    <Text>{ngo.ngo.strategy.values.join(', ')}</Text>
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Projekty</Heading>
                    {ngo.ngo.projects.map((project, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                            <Text><strong>Nazwa:</strong> {project.name}</Text>
                            <Text><strong>Opis:</strong> {project.description}</Text>
                            <Text><strong>Grupa docelowa:</strong> {project.target_group}</Text>
                            <Text><strong>Data rozpoczęcia:</strong> {project.start_date}</Text>
                            <Text><strong>Data zakończenia:</strong> {project.end_date}</Text>
                            <Text><strong>Cele:</strong> {project.objectives.join(', ')}</Text>
                            <Text><strong>Status:</strong> {project.status}</Text>
                            
                            <Heading as="h4" size="sm" mt={2}>Poprzednie doświadczenia:</Heading>
                            {project.previous_experience.map((exp, expIndex) => (
                                <Box key={expIndex} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                                    <Text><strong>Nazwa projektu:</strong> {exp.project_name}</Text>
                                    <Text><strong>Opis:</strong> {exp.description}</Text>
                                    <Text><strong>Wyniki:</strong> {exp.results}</Text>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Cele Społeczne i Biznesowe</Heading>
                    <Heading as="h3" size="md" mt={4}>Cele Społeczne</Heading>
                    <Text>{ngo.ngo.social_and_business_goals.social_goals.join(', ')}</Text>
                    
                    <Heading as="h3" size="md" mt={4}>Cele Biznesowe</Heading>
                    <Text>{ngo.ngo.social_and_business_goals.business_goals.join(', ')}</Text>
                </Box>

                <Divider />

                <Box>
                    <Heading as="h2" size="lg">Zespół</Heading>
                    {ngo.ngo.team.map((member, index) => (
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
