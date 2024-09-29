import { useQuery } from "react-query"
import { Company, NGO } from "./types"

export const useFoundations = () => {
    const { data: foundations } = useQuery('foundations', async () => {
        const response = await fetch('https://ngos-companies-matcher-gavdo.ondigitalocean.app/ngos')
        if (!response.ok) {
            console.log("no", response)
            throw new Error('aaaaaaaaaa')
        }

        return await response.json()
    })


    return foundations as (NGO & {_id:string})[] | undefined
}


export const createFoundation = async (data: NGO): Promise<{_id: string}> => {
    const response = await fetch('https://ngos-companies-matcher-gavdo.ondigitalocean.app/ngos', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        console.log("no", response)
            throw new Error('aaaaaaaaaa')
    }

    return await response.json()
}

export const useFoundation = (id: string) => {
    const { data: foundation, isLoading } = useQuery(['foundation', id], async () => {
        const response = await fetch(`https://ngos-companies-matcher-gavdo.ondigitalocean.app/ngos/${id}`)
        if (!response.ok) {
            console.log("no", response)
            throw new Error('aaaaaaaaaa')
        }

        return await response.json()
    })


    return {
        foundation,
        isLoading
    }
}



export const useCompanies = () => {
    const { data: companies } = useQuery('companies', async () => {
        const response = await fetch('https://ngos-companies-matcher-gavdo.ondigitalocean.app/companies')
        if (!response.ok) {
            console.log("no", response)
            throw new Error('aaaaaaaaaa')
        }

        return await response.json()
    })


    return companies as (Company & {_id:string})[] | undefined
}


export const createCompany = async (data: Company): Promise<{_id: string}> => {
    const response = await fetch('https://ngos-companies-matcher-gavdo.ondigitalocean.app/companies', {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        console.log("no", response)
            throw new Error('aaaaaaaaaa')
    }

    return await response.json()
}

export const useCompany = (id: string) => {
    const { data: company, isLoading } = useQuery(['company', id], async () => {
        const response = await fetch(`https://ngos-companies-matcher-gavdo.ondigitalocean.app/companies/${id}`)
        if (!response.ok) {
            console.log("no", response)
            throw new Error('aaaaaaaaaa')
        }

        return await response.json()
    })


    return {
        company,
        isLoading
    }
}
