import React, { useState } from 'react';
import {
    Box, Button, FormControl, FormLabel, Input, Textarea, VStack, HStack, Heading, Stack, Text,
    Divider
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Company, NGO } from '../types';

function useFormData<T>(initialData: T) {
    const [formData, setFormData] = useState<T>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, path: string[]) => {
        const updatedFormData = { ...formData };
        let current = updatedFormData;

        for (let i = 0; i < path.length - 1; i++) {
            // @ts-ignore
            current = current[path[i]];
        }
        // @ts-ignore
        current[path[path.length - 1]] = e.target.value;
        setFormData(updatedFormData);
    };

    const handleArrayChange = (index: number, value: string, path: string[]) => {
        const updatedFormData = { ...formData };
        let current = updatedFormData;

        for (let i = 0; i < path.length - 1; i++) {
            // @ts-ignore
            current = current[path[i]];
        }
        // @ts-ignore
        current[path[path.length - 1]][index] = value;
        setFormData(updatedFormData);
    };

    const handleAddItem = (path: string[], initialValue: any) => {
        const updatedFormData = { ...formData };
        let current = updatedFormData;

        for (let i = 0; i < path.length - 1; i++) {
            // @ts-ignore
            current = current[path[i]];
        }
        // @ts-ignore
        current[path[path.length - 1]].push(initialValue);
        setFormData(updatedFormData);
    };

    const handleRemoveItem = (index: number, path: string[]) => {
        const updatedFormData = { ...formData };
        let current = updatedFormData;

        for (let i = 0; i < path.length - 1; i++) {
            // @ts-ignore
            current = current[path[i]];
        }
        // @ts-ignore
        current[path[path.length - 1]].splice(index, 1);
        setFormData(updatedFormData);
    };


    return {
        formData,
        setFormData,
        handleAddItem,
        handleArrayChange,
        handleChange,
        handleRemoveItem
    }
}

const CreateFoundationForm: React.FC = () => {
    const {
        formData,
        handleAddItem,
        handleArrayChange,
        handleChange,
        handleRemoveItem
    } = useFormData<NGO>({
        ngo: {
            name: '',
            description: '',
            strategy: {
                mission: '',
                vision: '',
                goals: [''],
                values: ['']
            },
            projects: [],

            social_and_business_goals: {
                social_goals: [''],
                business_goals: ['']
            },
            team: []
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <Box maxW="4xl" w="100%" mx="auto" p={8} bg="white" borderRadius="lg" boxShadow="lg" mt={6} boxSizing='border-box'>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
                Stwórz Fundację / NGO
            </Heading>

            <form onSubmit={handleSubmit}>
                <VStack spacing={8} align="stretch">

                    <FormControl id="ngo.name" isRequired>
                        <FormLabel>Nazwa Fundacji</FormLabel>
                        <Input
                            value={formData.ngo.name}
                            onChange={(e) => handleChange(e, ['ngo', 'name'])}
                            placeholder="Wpisz nazwę fundacji"
                        />
                    </FormControl>

                    <FormControl id="ngo.description" isRequired>
                        <FormLabel>Opis Fundacji</FormLabel>
                        <Textarea
                            value={formData.ngo.description}
                            onChange={(e) => handleChange(e, ['ngo', 'description'])}
                            placeholder="Wpisz krótki opis fundacji"
                        />
                    </FormControl>
                    <Divider />

                    <Heading as="h3" size="md">Strategia</Heading>

                    <FormControl id="ngo.strategy.mission" isRequired>
                        <FormLabel>Misja</FormLabel>
                        <Textarea
                            value={formData.ngo.strategy.mission}
                            onChange={(e) => handleChange(e, ['ngo', 'strategy', 'mission'])}
                            placeholder="Wpisz misję organizacji"
                        />
                    </FormControl>

                    <FormControl id="ngo.strategy.vision" isRequired>
                        <FormLabel>Wizja</FormLabel>
                        <Textarea
                            value={formData.ngo.strategy.vision}
                            onChange={(e) => handleChange(e, ['ngo', 'strategy', 'vision'])}
                            placeholder="Wpisz wizję organizacji"
                        />
                    </FormControl>

                    <FormControl id="ngo.strategy.goals" isRequired>
                        <FormLabel>Cele Organizacji</FormLabel>
                        {formData.ngo.strategy.goals.map((goal, index) => (
                            <HStack key={index} mb={2}>
                                <Input
                                    value={goal}
                                    onChange={(e) => handleArrayChange(index, e.target.value, ['ngo', 'strategy', 'goals'])}
                                    placeholder={`Cel ${index + 1}`}
                                />
                                <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['ngo', 'strategy', 'goals'])}>Usuń</Button>
                            </HStack>
                        ))}
                        <Button colorScheme="blue" onClick={() => handleAddItem(['ngo', 'strategy', 'goals'], '')}>Dodaj Cel</Button>
                    </FormControl>

                    <Divider />
                    <Box>
                        <Heading as="h3" size="md" mb={8}>Projekty</Heading>
                        {formData.ngo.projects.map((project, projectIndex) => (
                            <VStack key={projectIndex} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                                <FormControl id={`ngo.projects[${projectIndex}].name`} isRequired>
                                    <FormLabel>Nazwa Projektu</FormLabel>
                                    <Input
                                        value={project.name}
                                        onChange={(e) => handleChange(e, ['ngo', 'projects', projectIndex.toString(), 'name'])}
                                        placeholder="Wpisz nazwę projektu"
                                    />
                                </FormControl>

                                <FormControl id={`ngo.projects[${projectIndex}].description`} isRequired>
                                    <FormLabel>Opis Projektu</FormLabel>
                                    <Textarea
                                        value={project.description}
                                        onChange={(e) => handleChange(e, ['ngo', 'projects', projectIndex.toString(), 'description'])}
                                        placeholder="Wpisz opis projektu"
                                    />
                                </FormControl>


                                <Button colorScheme="red" onClick={() => handleRemoveItem(projectIndex, ['ngo', 'projects'])}>Usuń Projekt</Button>
                            </VStack>
                        ))}
                        <Button colorScheme="blue" onClick={() => handleAddItem(['ngo', 'projects'], {
                            name: '',
                            description: '',
                            target_group: '',
                            start_date: '',
                            end_date: '',
                            objectives: [''],
                            status: '',
                            previous_experience: [{ project_name: '', description: '', results: '' }]
                        })}>Dodaj Projekt</Button>
                    </Box>
                    <Divider />
                    <Heading as="h3" size="md">Cele Społeczne i Biznesowe</Heading>

                    <FormControl id="ngo.social_and_business_goals.social_goals" isRequired>
                        <FormLabel>Cele Społeczne</FormLabel>
                        {formData.ngo.social_and_business_goals.social_goals.map((socialGoal, index) => (
                            <HStack key={index} mb={2}>
                                <Input
                                    value={socialGoal}
                                    onChange={(e) => handleArrayChange(index, e.target.value, ['ngo', 'social_and_business_goals', 'social_goals'])}
                                    placeholder={`Cel społeczny ${index + 1}`}
                                />
                                <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['ngo', 'social_and_business_goals', 'social_goals'])}>Usuń</Button>
                            </HStack>
                        ))}
                        <Button colorScheme="blue" onClick={() => handleAddItem(['ngo', 'social_and_business_goals', 'social_goals'], '')}>Dodaj Cel Społeczny</Button>
                    </FormControl>

                    <FormControl id="ngo.social_and_business_goals.business_goals" isRequired>
                        <FormLabel>Cele Biznesowe</FormLabel>
                        {formData.ngo.social_and_business_goals.business_goals.map((businessGoal, index) => (
                            <HStack key={index} mb={2}>
                                <Input
                                    value={businessGoal}
                                    onChange={(e) => handleArrayChange(index, e.target.value, ['ngo', 'social_and_business_goals', 'business_goals'])}
                                    placeholder={`Cel biznesowy ${index + 1}`}
                                />
                                <Button colorScheme="red" onClick={() => handleRemoveItem(index, ['ngo', 'social_and_business_goals', 'business_goals'])}>Usuń</Button>
                            </HStack>
                        ))}
                        <Button colorScheme="blue" onClick={() => handleAddItem(['ngo', 'social_and_business_goals', 'business_goals'], '')}>Dodaj Cel Biznesowy</Button>
                    </FormControl>
                    <Divider />
                    <Box>
                        <Heading as="h3" size="md" mb={4}>Członkowie Zespołu</Heading>

                        {formData.ngo.team.map((teamMember, teamIndex) => (
                            <VStack key={teamIndex} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
                                <FormControl id={`team[${teamIndex}].name`} isRequired>
                                    <FormLabel>Imię i nazwisko</FormLabel>
                                    <Input
                                        value={teamMember.name}
                                        onChange={(e) => handleChange(e, ['team', teamIndex.toString(), 'name'])}
                                        placeholder="Wpisz imię i nazwisko"
                                    />
                                </FormControl>

                                <FormControl id={`team[${teamIndex}].position`} isRequired>
                                    <FormLabel>Stanowisko</FormLabel>
                                    <Input
                                        value={teamMember.position}
                                        onChange={(e) => handleChange(e, ['ngo', 'team', teamIndex.toString(), 'position'])}
                                        placeholder="Wpisz stanowisko"
                                    />
                                </FormControl>

                                <FormControl id={`team[${teamIndex}].experience`} isRequired>
                                    <FormLabel>Doświadczenie zawodowe</FormLabel>
                                    <Textarea
                                        value={teamMember.experience}
                                        onChange={(e) => handleChange(e, ['ngo', 'team', teamIndex.toString(), 'experience'])}
                                        placeholder="Wpisz doświadczenie zawodowe"
                                    />
                                </FormControl>

                                <FormControl id={`team[${teamIndex}].skills`} isRequired>
                                    <FormLabel>Umiejętności</FormLabel>
                                    {teamMember.skills.map((skill, skillIndex) => (
                                        <HStack key={skillIndex} mb={2}>
                                            <Input
                                                value={skill}
                                                onChange={(e) => handleArrayChange(skillIndex, e.target.value, ['ngo', 'team', teamIndex.toString(), 'skills'])}
                                                placeholder={`Umiejętność ${skillIndex + 1}`}
                                            />
                                            <Button colorScheme="red" onClick={() => handleRemoveItem(skillIndex, ['ngo', 'team', teamIndex.toString(), 'skills'])}>Usuń</Button>
                                        </HStack>
                                    ))}
                                    <Button colorScheme="blue" onClick={() => handleAddItem(['ngo', 'team', teamIndex.toString(), 'skills'], '')}>Dodaj Umiejętność</Button>
                                </FormControl>


                                <Button colorScheme="red" mt={4} onClick={() => handleRemoveItem(teamIndex, ['ngo', 'team'])}>
                                    Usuń Członka Zespołu
                                </Button>
                            </VStack>
                        ))}

                        <Button colorScheme="blue" onClick={() => handleAddItem(['ngo', 'team'], {
                            name: '',
                            position: '',
                            experience: '',
                            skills: [''],
                            previous_projects: [{ project_name: '', description: '' }]
                        })}>Dodaj Członka Zespołu</Button>
                    </Box>

                    <Button colorScheme="teal" type="submit" size="lg">Utwórz Fundację</Button>
                </VStack>
            </form>
        </Box>
    );
};

const CreateCompanyForm: React.FC = () => {
    const {
        formData,
        handleAddItem,
        handleArrayChange,
        handleChange,
        handleRemoveItem
    } = useFormData<Company>({
        company: {
            name: '',
            description: '',
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
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

                    <FormControl id="company.social_impact_strategy.actions" isRequired>
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

const AddForm = () => {
    const {type} = useParams<{type: string}>()

    if (type === 'company') {
        return <CreateCompanyForm />
    }

    return <CreateFoundationForm />
}

export default AddForm