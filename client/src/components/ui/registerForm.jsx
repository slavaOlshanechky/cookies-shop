import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import validator from "../../utils/validator";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        license: false
    })

    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Please enter email'
            },
            isEmail: {
                message: 'Please check email'
            }
        },
        password: {
            isRequired: {
                message: 'Please enter password'
            },
            isCapitalSymbol: {
                message: 'Password should contain at least one capital symbol'
            },
            isContainDigit: {
                message: 'Password should contain at least one number'
            },
            min: {
                message: 'Password length should be at least 8 symbols',
                value: 8
            }
        },
        firstName: {
            isRequired: {
                message: 'Please enter first name'
            },
            min: {
                message: 'First name should be 2 chars min',
                value: 2
            }
        },
        lastName: {
            isRequired: {
                message: 'Please enter last name'
            },
            min: {
                message: 'Last name should be 2 chars min',
                value: 2
            }
        },
        license: {
            isRequired: {
                message: 'Please accept license agreement'
            }
        }
    };

    const validate = () => {
        const errors = validator(formData, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        validate()
    }, [formData]);

    useEffect(() => {
        setErrors({})
    }, [])
}