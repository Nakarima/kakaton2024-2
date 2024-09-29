import { Center, HStack, Spinner } from "@chakra-ui/react"
import { useCompanies, useFoundations } from "../orgs"
import { CompanyCard, NGOCard } from "../components/card"
import { useParams } from "react-router-dom"

const SearchFoundations = () => {
    const foundations = useFoundations()

    if (!foundations) {
        return <Center  minH="50vh"><Spinner /></Center>
    }

    return (
        <HStack flexWrap='wrap' justifyContent={'center'} mt={8}>
            {foundations.map((f, index) => (
                <NGOCard
                    id={f._id}
                    name={f.ngo.name}
                    key={index}
                    description={f.ngo.description}
                    goals={f.ngo.social_and_business_goals.social_goals}
                    teamCount={f.ngo.team.length}
                />
            ))}
        </HStack>
    )
}

const SearchCompany = () => {
    const companies = useCompanies()

    if (!companies) {
        return <Center  minH="50vh"><Spinner /></Center>
    }

    return (
        <HStack flexWrap='wrap' justifyContent={'center'} mt={8}>
            {companies.map((f, index) => (
                <CompanyCard
                    id={f._id}
                    name={f.company.name}
                    key={index}
                    description={f.company.description}
                    socialImpactStrategy={f.company.social_impact_strategy.mission}
                    totalBudget={f.company.social_impact_budget.total_budget}
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