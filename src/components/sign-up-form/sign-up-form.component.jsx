import { useState } from "react";



import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import {SignUpContainer} from './sign-up-form.styles';
import Button from "../button/button.component";


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        //confirm password matches
        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }
        
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user,{ displayName });
            resetFormFields();
        } catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert('Cannot create user, email already in use');
            } else {
                console.error('user creation encounted an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
        console.log(formFields);
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" name="displayName" required onChange={handleChange} value={displayName}/>
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} minLength={6}/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} minLength={6}/>

                <Button type="submit" children="Sign Up"/>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;