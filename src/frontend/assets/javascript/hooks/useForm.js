import {
    useState
} from 'react'

export const useForm = (initialForm, validateForm) => {
    /* Setting the state of the form and errors to the initial form and an empty object. */
    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    /**
     * It takes the name and value of the input field and sets the state of the form to the name and value
     * of the input field.
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
     * When the user clicks out of the input field, the handleChange function is called, and then the
     * validateForm function is called, and the errors object is set to the result of the validateForm
     * function.
     * @param e - the event object
     */
    const handleBlur = (e) => {
        handleChange(e);
        setErrors(validateForm(form))
    }
    /**
     * If there are no errors, show a success message and reset the form after 2 seconds.
     * @param e - event
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

    /* Returning the form, errors, handleChange, handleBlur, and handleSubmit functions. */
    return {
        form,
        errors,
        handleChange,
        handleBlur,
        handleSubmit
    }
}