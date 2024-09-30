import { useState } from "react";


import FormInput from "../form-input/form-input.component";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';
import Button from "../button/button.component";


const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;


    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error){
            if(error.code == 'auth/invalid-credential'){
                alert('incorrect credentials');
            }
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value})
    }

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} minLength={6}/>
                <div className="buttons-container"> 
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;