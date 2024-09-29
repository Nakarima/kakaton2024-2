import React from 'react';
import {
    Box,
    Text,
    VStack,
    Divider,
} from '@chakra-ui/react';
import { Company } from '../types';

interface CompanySummaryProps {
    companyDto: Company;
}

const CompanySummary: React.FC<CompanySummaryProps> = ({ companyDto }) => {
    const { company } = companyDto
    return (
        <Box maxW="4xl" w="100%" mx="auto" p={8} bg="white" borderRadius="lg" boxShadow="lg" mt={6}>
            <VStack spacing={6} align="stretch">

                <Box>
                    <Text fontSize="lg" fontWeight="bold">O firmie</Text>
                    <Text>{company.description}</Text>
                </Box>

                <Box>
                    <Text>Email: {company.email}</Text>
                </Box>

                <Box>
                    <Text fontSize="lg" fontWeight="bold">Nasza strategia społecznego wpływu</Text>
                    <Text><strong>Misja:</strong> {company.social_impact_strategy.mission}</Text>
                    <Text><strong>Wizja:</strong> {company.social_impact_strategy.vision}</Text>

                    <Text fontSize="md" fontWeight="bold" mt={2}>Nasze działania</Text>
                    {company.social_impact_strategy.actions.map((action, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" mb={2}>
                            <Text><strong>{action.name}</strong> - {action.description}</Text>
                            <Text><strong>Start:</strong> {action.start_date}</Text>
                            <Text><strong>Koniec:</strong> {action.end_date}</Text>
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box>
                    <Text fontSize="lg" fontWeight="bold">Cele społeczne</Text>
                    {company.social_goals.map((goal, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" mb={2}>
                            <Text><strong>{goal.goal}</strong> - {goal.description}</Text>
                            <Text><strong>Termin:</strong> {goal.target_date}</Text>
                        </Box>
                    ))}
                </Box>

                <Box>
                    <Text fontSize="lg" fontWeight="bold">Cele biznesowe</Text>
                    {company.business_goals.map((goal, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" mb={2}>
                            <Text><strong>{goal.goal}</strong> - {goal.description}</Text>
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box>
                    <Text fontSize="lg" fontWeight="bold">Budżet na działania społeczne</Text>
                    <Text><strong>Całkowity budżet:</strong> {company.social_impact_budget.total_budget} zł</Text>
                    <Text fontSize="md" fontWeight="bold" mt={2}>Przydzielony budżet</Text>
                    {company.social_impact_budget.allocated_budget.map((budget, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                            <Text><strong>{budget.action_name}</strong> - {budget.amount} zł</Text>
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box>
                    <Text fontSize="lg" fontWeight="bold">Poszukiwani partnerzy</Text>
                    {company.partners_needed.map((partner, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                            <Text><strong>{partner.type}</strong> - {partner.description}</Text>
                        </Box>
                    ))}
                </Box>

                <Divider />

                <Box>
                    <Text fontSize="lg" fontWeight="bold">Granty</Text>
                    {company.grants.map((grant, index) => (
                        <Box key={index} p={2} border="1px solid #ccc" borderRadius="md" my={2}>
                            <Text><strong>{grant.grant_name}</strong> - {grant.description}</Text>
                            <Text><strong>Termin aplikacji:</strong> {grant.application_deadline}</Text>
                            <Text><strong>Wymagania:</strong> {grant.requirements}</Text>
                        </Box>
                    ))}
                </Box>

            </VStack>
        </Box>
    );
};

export default CompanySummary;
