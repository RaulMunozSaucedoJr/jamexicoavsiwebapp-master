/**
 * It returns an object with the form, errors, handleChange, handleBlur, and handleSubmit functions
 * @param initialForm - This is the initial state of the form.
 * @param validateForm - This is a function that takes in the form object and returns an object with
 * the errors.
 * @returns An object with the following properties:
 * form: The current state of the form
 * errors: The current state of the errors
 * handleChange: A function that updates the form state
 * handleBlur: A function that updates the form state and the errors state
 * handleSubmit: A function that updates the errors state and resets the form state
 */
import {
    useState
} from 'react'

export const useForm = (initialForm, validateForm) => {
    /* Creating two state variables. One for the form and one for the errors. */
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    /**
     * When the user types in the input field, the handleChange function will update the state of the
     * form with the value of the input field.
     * @param e - the event object
     */
    const handleChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setForm({
            [name]: value
        })
    }
    /**
     * When the user clicks out of the input field, the handleChange function is called, and the
     * validateForm function is called, and the errors object is set to the result of the validateForm
     * function.
     * @param e - the event object
     */
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form))
    }
    /**
     * If there are no errors, set the form to the initial form after 2 seconds.
     * @param e - the event object
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form))

        if (Object.keys(errors).length === 0) {
            setTimeout(() => {
                setForm(initialForm);
            }, 2000)
        }
    }

    /* Returning an object with the form, errors, handleChange, handleBlur, and handleSubmit functions. */
    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    }
}