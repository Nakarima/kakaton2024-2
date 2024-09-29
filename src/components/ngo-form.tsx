import { Box, Button, Divider, FormControl, FormLabel, Heading, HStack, Input, Textarea, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createFoundation } from "../orgs";
import { NGO } from "../types";
import useFormData from "../use-form-data";


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
            email: '',
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

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        const res = await createFoundation(formData)
        navigate('/foundation/' + res._id)
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

                    <FormControl id="ngo.email" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                            value={formData.ngo.email}
                            onChange={(e) => handleChange(e, ['ngo', 'email'])}
                            placeholder="Wpisz email do kontaktu"
                            type='email'
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
                                        onChange={(e) => handleChange(e, ['ngo', 'team', teamIndex.toString(), 'name'])}
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

export default CreateFoundationForm