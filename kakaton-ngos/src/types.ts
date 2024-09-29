
export interface NGO {
    ngo: {
        name: string;
        description: string;
        email: string;
        strategy: {
            mission: string;
            vision: string;
            goals: string[];
            values: string[];
        };
        projects: {
            name: string;
            description: string;
            target_group: string;
            start_date: string;
            end_date: string;
            objectives: string[];
            status: string;
            previous_experience: {
                project_name: string;
                description: string;
                results: string;
            }[];
        }[];
        social_and_business_goals: {
            social_goals: string[];
            business_goals: string[];
        };
        team: {
            name: string;
            position: string;
            experience: string;
            skills: string[];
            previous_projects: {
                project_name: string;
                description: string;
            }[];
        }[]
    };
}

export interface Company {
    company: {
        name: string;
        description: string;
        email: string;
        social_impact_strategy: {
            mission: string;
            vision: string;
            actions: {
                name: string;
                description: string;
                start_date: string;
                end_date: string;
            }[];
        };
        social_goals: {
            goal: string;
            description: string;
            target_date: string;
        }[]
        business_goals: {
            goal: string;
            description: string;
        }[]
        social_impact_budget: {
            total_budget: number;
            allocated_budget: {
                action_name: string;
                amount: number;
            }[];
        }
        partners_needed: {
            type: string;
            description: string;
        }[]
        grants: {
            grant_name: string;
            description: string;
            application_deadline: string;
            requirements: string;
        }[]
    };
}

