
import { useParams } from 'react-router-dom';
import CreateCompanyForm from '../components/company-form';
import CreateFoundationForm from '../components/ngo-form';



const AddForm = () => {
    const {type} = useParams<{type: string}>()

    if (type === 'company') {
        return <CreateCompanyForm />
    }

    return <CreateFoundationForm />
}

export default AddForm