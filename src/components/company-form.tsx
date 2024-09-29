import { Box, Heading, VStack, FormControl, FormLabel, Input, Textarea, Divider, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../orgs";
import { Company } from "../types";
import useFormData from "../use-form-data";

const CreateCompanyForm: React.FC = () => {
    const {
        formData,
        handleAddItem,
        handleChange,
        handleRemoveItem
    } = useFormData<Company>({
        company: {
            name: '',
            description: '',
            email: '',
            social_impact_strategy: {
                mission: '',
                vision: '',
                actions: []
            },
            social_goals: [],
            business_goals: [],
            social_impact_budget: {
                total_budget: 0,
                allocated_budget: []
            },
            partners_needed: [],
            grants: []
        }
    });

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const res = await createCompany(formData)
        navigate('/kakaton2024-2/org/' + res._id)
    };

    return (
        <Box maxW="4xl" w="100%" mx="auto" p={8} bg="white" borderRadius="lg" boxShadow="lg" mt={6} boxSizing='border-box'>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
                Stwórz Firmę
            </Heading>

            <form onSubmit={handleSubmit}>
                <VStack spacing={8} align="stretch">

                    <FormControl id="company.name" isRequired>
                        <FormLabel>Nazwa Firmy</FormLabel>
                        <Input
                            value={formData.company.name}
                            onChange={(e) => handleChange(e, ['company', 'name'])}
                            placeholder="Wpisz nazwę firmy"
                        />
                    </FormControl>

                    <FormControl id="company.description" isRequired>
                        <FormLabel>Opis Firmy</FormLabel>
                        <Textarea
                            value={formData.company.description}
                            onChange={(e) => handleChange(e, ['company', 'description'])}
                            placeholder="Wpisz krótki opis firmy"
                        />
                    </FormControl>

                    <FormControl id="ngo.email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={formData.company.email}
                            onChange={(e) => handleChange(e, ['company', 'email'])}
                            placeholder="Wpisz email do kontaktu"
                            type='email'
                        />
                    </FormControl>

                    <Divider />
                    <Heading as="h3" size="md">Strategia Społecznego Wpływu</Heading>

                    <FormControl id="company.social_impact_strategy.mission" isRequired>
                        <FormLabel>Misja</FormLabel>
                        <Textarea
                            value={formData.company.social_impact_strategy.mission}
                            onChange={(e) => handleChange(e, ['company', 'social_impact_strategy', 'mission'])}
                            placeholder="Wpisz misję firmy"
                        />
                    </FormControl>

                    <FormControl id="company.social_impact_strategy.vision" isRequired>
                        <FormLabel>Wizja</FormLabel>
                        <Textarea
                            value={formData.company.social_impact_strategy.vision}
                            onChange={(e) => handleChange(e, ['company', 'social_impact_strategy', 'vision'])}
                            placeholder="Wpisz wizję firmy"
                        />
                    </FormControl>

                    <FormControl id="company.social_impact_strategy.actions">
                        <FormLabel>Działania</FormLabel>
                        {formData.company.social_impact_strategy.actions.map((action, index) => (
                            <VStack key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                                <FormControl id={`company.social_impact_strategy.actions[${index}].name`} isRequired>
                                    <FormLabel>Nazwa Działania</FormLabel>
                                    <Input
                                        value={action.name}
                                        onChange={(e) => handleChange(e, ['company', 'social_impact_strategy', 'actions', index.toString(), 'name'])}
                                        placeholder="Wpisz nazwę działania"
                                    />
                                </FormControl>

                                <FormControl id={`company.social_impact_strategy.actions[${index}].description`} isRequired>
                                    <FormLabel>Opis Działania</FormLabel>
                                    <Textarea
                                        value={action.description}
                                        onChange={(e) => handleChange(e, ['company', 'social_impact_strategy', 'actions', index.toString(), 'description'])}
                                        placeholder="Wpisz opis działania"
                                    />
                                </FormControl>

                                <FormControl id={`company.social_impact_strategy.actions[${index}].start_date`} isRequired>
                                    <FormLabel>Data Rozpoczęcia</FormLabel>
                                    <Input
                                        type="date"
                                        value={action.start_date}
                                        onChange={(e) => handleChange(e, ['company', 'social_impact_strategy', 'actions', index.toString(), 'start_date'])}
                                    />
                                </FormControl>

                                <FormControl id={`company.social_impact_strategy.actions[${index}].end_date`} isRequired>
                                    <FormLabel>Data Zakończenia</FormLabel>
                                    <Input
                                        type="date"
                                        value={action.end_date}
                                        onChange={(e) => handleChange(e, ['company', 'social_impact_strategy', 'actions', index.toString(), 'end_date'])}
                                    />
                                </FormControl>

                                <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['company', 'social_impact_strategy', 'actions'])}>Usuń Działanie</Button>
                            </VStack>
                        ))}
                        <Button colorScheme="blue" onClick={() => handleAddItem(['company', 'social_impact_strategy', 'actions'], { name: '', description: '', start_date: '', end_date: '' })}>Dodaj Działanie</Button>
                    </FormControl>

                    <Divider />
                    <Heading as="h3" size="md">Cele Społeczne</Heading>

                    {formData.company.social_goals.map((socialGoal, index) => (
                        <VStack key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                            <FormControl id={`company.social_goals[${index}].goal`} isRequired>
                                <FormLabel>Cel</FormLabel>
                                <Input
                                    value={socialGoal.goal}
                                    onChange={(e) => handleChange(e, ['company', 'social_goals', index.toString(), 'goal'])}
                                    placeholder="Wpisz cel społeczny"
                                />
                            </FormControl>

                            <FormControl id={`company.social_goals[${index}].description`} isRequired>
                                <FormLabel>Opis</FormLabel>
                                <Textarea
                                    value={socialGoal.description}
                                    onChange={(e) => handleChange(e, ['company', 'social_goals', index.toString(), 'description'])}
                                    placeholder="Wpisz opis celu"
                                />
                            </FormControl>

                            <FormControl id={`company.social_goals[${index}].target_date`} isRequired>
                                <FormLabel>Data Docelowa</FormLabel>
                                <Input
                                    type="date"
                                    value={socialGoal.target_date}
                                    onChange={(e) => handleChange(e, ['company', 'social_goals', index.toString(), 'target_date'])}
                                />
                            </FormControl>

                            <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['company', 'social_goals'])}>Usuń Cel</Button>
                        </VStack>
                    ))}
                    <Button colorScheme="blue" onClick={() => handleAddItem(['company', 'social_goals'], { goal: '', description: '', target_date: '' })}>Dodaj Cel Społeczny</Button>

                    <Divider />
                    <Heading as="h3" size="md">Cele Biznesowe</Heading>

                    {formData.company.business_goals.map((businessGoal, index) => (
                        <VStack key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                            <FormControl id={`company.business_goals[${index}].goal`} isRequired>
                                <FormLabel>Cel</FormLabel>
                                <Input
                                    value={businessGoal.goal}
                                    onChange={(e) => handleChange(e, ['company', 'business_goals', index.toString(), 'goal'])}
                                    placeholder="Wpisz cel biznesowy"
                                />
                            </FormControl>

                            <FormControl id={`company.business_goals[${index}].description`} isRequired>
                                <FormLabel>Opis</FormLabel>
                                <Textarea
                                    value={businessGoal.description}
                                    onChange={(e) => handleChange(e, ['company', 'business_goals', index.toString(), 'description'])}
                                    placeholder="Wpisz opis celu"
                                />
                            </FormControl>

                            <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['company', 'business_goals'])}>Usuń Cel</Button>
                        </VStack>
                    ))}
                    <Button colorScheme="blue" onClick={() => handleAddItem(['company', 'business_goals'], { goal: '', description: '' })}>Dodaj Cel Biznesowy</Button>

                    <Divider />
                    <Heading as="h3" size="md">Budżet Społeczny</Heading>

                    <FormControl id="company.social_impact_budget.total_budget" isRequired>
                        <FormLabel>Całkowity Budżet</FormLabel>
                        <Input
                            type="number"
                            value={formData.company.social_impact_budget.total_budget}
                            onChange={(e) => handleChange(e, ['company', 'social_impact_budget', 'total_budget'])}
                            placeholder="Wpisz całkowity budżet"
                        />
                    </FormControl>

                    {formData.company.social_impact_budget.allocated_budget.map((allocation, index) => (
                        <VStack key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                            <FormControl id={`company.social_impact_budget.allocated_budget[${index}].action_name`} isRequired>
                                <FormLabel>Nazwa Działania</FormLabel>
                                <Input
                                    value={allocation.action_name}
                                    onChange={(e) => handleChange(e, ['company', 'social_impact_budget', 'allocated_budget', index.toString(), 'action_name'])}
                                    placeholder="Wpisz nazwę działania"
                                />
                            </FormControl>

                            <FormControl id={`company.social_impact_budget.allocated_budget[${index}].amount`} isRequired>
                                <FormLabel>Kwota</FormLabel>
                                <Input
                                    type="number"
                                    value={allocation.amount}
                                    onChange={(e) => handleChange(e, ['company', 'social_impact_budget', 'allocated_budget', index.toString(), 'amount'])}
                                    placeholder="Wpisz kwotę"
                                />
                            </FormControl>

                            <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['company', 'social_impact_budget', 'allocated_budget'])}>Usuń Alokację</Button>
                        </VStack>
                    ))}
                    <Button colorScheme="blue" onClick={() => handleAddItem(['company', 'social_impact_budget', 'allocated_budget'], { action_name: '', amount: 0 })}>Dodaj Alokację</Button>

                    <Divider />
                    <Heading as="h3" size="md">Potrzebni Partnerzy</Heading>

                    {formData.company.partners_needed.map((partner, index) => (
                        <VStack key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                            <FormControl id={`company.partners_needed[${index}].type`} isRequired>
                                <FormLabel>Typ</FormLabel>
                                <Input
                                    value={partner.type}
                                    onChange={(e) => handleChange(e, ['company', 'partners_needed', index.toString(), 'type'])}
                                    placeholder="Wpisz typ partnera"
                                />
                            </FormControl>

                            <FormControl id={`company.partners_needed[${index}].description`} isRequired>
                                <FormLabel>Opis</FormLabel>
                                <Textarea
                                    value={partner.description}
                                    onChange={(e) => handleChange(e, ['company', 'partners_needed', index.toString(), 'description'])}
                                    placeholder="Wpisz opis partnera"
                                />
                            </FormControl>

                            <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['company', 'partners_needed'])}>Usuń Partnera</Button>
                        </VStack>
                    ))}
                    <Button colorScheme="blue" onClick={() => handleAddItem(['company', 'partners_needed'], { type: '', description: '' })}>Dodaj Partnera</Button>

                    <Divider />
                    <Heading as="h3" size="md">Granty</Heading>

                    {formData.company.grants.map((grant, index) => (
                        <VStack key={index} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                            <FormControl id={`company.grants[${index}].grant_name`} isRequired>
                                <FormLabel>Nazwa Grantu</FormLabel>
                                <Input
                                    value={grant.grant_name}
                                    onChange={(e) => handleChange(e, ['company', 'grants', index.toString(), 'grant_name'])}
                                    placeholder="Wpisz nazwę grantu"
                                />
                            </FormControl>

                            <FormControl id={`company.grants[${index}].description`} isRequired>
                                <FormLabel>Opis</FormLabel>
                                <Textarea
                                    value={grant.description}
                                    onChange={(e) => handleChange(e, ['company', 'grants', index.toString(), 'description'])}
                                    placeholder="Wpisz opis grantu"
                                />
                            </FormControl>

                            <FormControl id={`company.grants[${index}].application_deadline`} isRequired>
                                <FormLabel>Termin Złożenia Wniosku</FormLabel>
                                <Input
                                    type="date"
                                    value={grant.application_deadline}
                                    onChange={(e) => handleChange(e, ['company', 'grants', index.toString(), 'application_deadline'])}
                                />
                            </FormControl>

                            <FormControl id={`company.grants[${index}].requirements`} isRequired>
                                <FormLabel>Wymagania</FormLabel>
                                <Textarea
                                    value={grant.requirements}
                                    onChange={(e) => handleChange(e, ['company', 'grants', index.toString(), 'requirements'])}
                                    placeholder="Wpisz wymagania do grantu"
                                />
                            </FormControl>

                            <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['company', 'grants'])}>Usuń Grant</Button>
                        </VStack>
                    ))}
                    <Button colorScheme="blue" onClick={() => handleAddItem(['company', 'grants'], { grant_name: '', description: '', application_deadline: '', requirements: '' })}>Dodaj Grant</Button>

                    <Button colorScheme="green" type="submit">Zapisz Firmę</Button>
                </VStack>
            </form>
        </Box>
    );
};

export default CreateCompanyForm