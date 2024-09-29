import { useState } from "react";

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

export default useFormData