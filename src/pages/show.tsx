
import {
    Center,
    Spinner,
} from '@chakra-ui/react';
import NGOSummary from '../components/ngo-summary';
import { useParams } from 'react-router-dom';
import { useCompany, useFoundation } from '../orgs';
import CompanySummary from '../components/company-summary';

interface Props {
    isCompany?: boolean
}


const ShowNgo = () => {
    const { id } = useParams<{id: string}>()
    const {foundation, isLoading} = useFoundation(id!)
    if (isLoading) {
        return (<Center minH="50vh">
            <Spinner size={'xl'} />
        </Center>)
    }
    return (<NGOSummary ngoDTO={foundation} />)
}


const ShowOrg = () => {
    const { id } = useParams<{id: string}>()
    const {company, isLoading} = useCompany(id!)

    console.log(isLoading, company)
    if (isLoading) {
        return (<Center minH="50vh">
            <Spinner size={'xl'} />
        </Center>)
    }
    return (<CompanySummary companyDto={company} />)
}

export default ({ isCompany }: Props) => {
    return isCompany ? <ShowOrg /> : <ShowNgo />
}
