import { useEffect, useState } from 'react';

interface UserFormProps<T> {
    initialValues: T;
    validate: (values: T) => Record<keyof T, string>;
}


function useForm<T>({ initialValues, validate }: UserFormProps<T>) {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});


    const handleChange = (name: keyof T, value: string) => {
        setValues({
            ...values,
            [name]: value,
        });
    };
    const handleBlur = (name: keyof T) => {
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const setFieldTouched = (name: keyof T, isTouched: boolean) => {
        setTouched({
            ...touched,
            [name]: isTouched,
        });
    };

    const getTextInputProps = (name: keyof T) => {
        const value = values[name];
        const onChangeText = (text: string) => handleChange(name, text);
        const onBlur = () => handleBlur(name);

        return {
            value,
            onChangeText,
            onBlur,
        };
    };

    useEffect(() => {
        const newErrors = validate(values);
        setErrors(newErrors);
    },[validate, values]);

    return {
        values,
        errors,
        touched,
        getTextInputProps,
        setFieldTouched,
    };
}

export default useForm;
