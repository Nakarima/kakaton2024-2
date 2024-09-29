import { Button, Center, Checkbox, FormControl, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Spinner, VStack } from "@chakra-ui/react"
import { useCompanies, useFoundations } from "../orgs"
import { CompanyCard, NGOCard } from "../components/card"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { useMemo, useState } from "react"

const FilterOptions = ({
    tags,
    checkedTags,
    setCheckedTags
}: {
    tags: string[];
    checkedTags: string[];
    setCheckedTags: (tags: string[]) => void
}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button colorScheme="teal">{checkedTags.length > 0 ? checkedTags.slice(0, 3).join(', ') + '...' : 'Tag filters'}</Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Choose tags to filter</PopoverHeader>
                <PopoverBody>
                    <FormControl>
                        <VStack alignItems={'flex-start'}>
                            {tags.map((tag, index) => <Checkbox key={index} isChecked={checkedTags.includes(tag)} onChange={() => {
                                const isChecked = checkedTags.includes(tag)
                                if (isChecked) {
                                    setCheckedTags(checkedTags.filter(t => t !== tag))
                                } else {
                                    setCheckedTags([...checkedTags, tag])
                                }
                            }}>{tag}</Checkbox>)}
                        </VStack>
                    </FormControl>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

const useTagsFilter = () => {
    const { data } = useQuery('tags', async () => {
        const response = await fetch('https://ngos-companies-matcher-gavdo.ondigitalocean.app/tags')
        if (!response.ok) {
            console.log("no", response)
            throw new Error('aaaaaaaaaa')
        }

        return await response.json()
    })

    const [checkedTags, setCheckedTags] = useState<string[]>([])

    return {
        tags: data?.tags || [],
        checkedTags,
        setCheckedTags
    }
}

const SearchFoundations = () => {
    const foundations = useFoundations()
    const { tags, setCheckedTags, checkedTags } = useTagsFilter()

    const filteredFoundations = useMemo(() => {
        if (checkedTags.length === 0) {
            return foundations || []
        }

        const a = new Set(checkedTags.flatMap(t => (foundations || []).filter(f => f.ngo.tags?.map(t => t.toLowerCase().trim()).includes(t.toLowerCase().trim()))))

        return Array.from(a)
    }, [checkedTags, foundations])

    if (!foundations) {
        return <Center minH="50vh"><Spinner /></Center>
    }

    return (
        <HStack flexWrap='wrap' justifyContent={'center'} mt={8}>
            {tags.length > 0 && <HStack>
                <FilterOptions tags={tags} checkedTags={checkedTags} setCheckedTags={setCheckedTags} />
            </HStack>}
            {filteredFoundations.map((f, index) => (
                <NGOCard
                    id={f._id}
                    name={f.ngo.name}
                    key={index}
                    description={f.ngo.description}
                    tags={f.ngo.tags || []}
                    teamCount={f.ngo.team.length}
                />
            ))}
        </HStack>
    )
}

const SearchCompany = () => {
    const companies = useCompanies()
    const { tags, setCheckedTags, checkedTags } = useTagsFilter()

    const filteredCoompanies = useMemo(() => {
        if (checkedTags.length === 0) {
            return companies || []
        }

        const a = new Set(checkedTags.flatMap(t => (companies || []).filter(f => f.company.tags?.map(t => t.toLowerCase().trim()).includes(t.toLowerCase().trim()))))

        return Array.from(a)
    }, [checkedTags, companies])

    if (!companies) {
        return <Center minH="50vh"><Spinner /></Center>
    }

    return (
        <HStack flexWrap='wrap' justifyContent={'center'} mt={8}>
            {tags.length > 0 && <HStack>
                <FilterOptions tags={tags} checkedTags={checkedTags} setCheckedTags={setCheckedTags} />
            </HStack>}
            {filteredCoompanies.map((f, index) => (
                <CompanyCard
                    id={f._id}
                    name={f.company.name}
                    key={index}
                    description={f.company.description}
                    socialImpactStrategy={f.company.social_impact_strategy.mission}
                    totalBudget={f.company.social_impact_budget.total_budget}
                    tags={f.company.tags || []}
                />
            ))}
        </HStack>
    )
}

export default () => {
    const { type } = useParams<{ type: string }>()
    if (type === 'foundation') {
        return <SearchFoundations />
    }

    return <SearchCompany />
}