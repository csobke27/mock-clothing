import { useState } from "react";



import FormInput from "../form-input/form-input.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.styles.scss';
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
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" name="displayName" required onChange={handleChange} value={displayName}/>
                <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>
                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} minLength={6}/>
                <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} minLength={6}/>
                {/* <label>Display Name</label>
                <input type="text" name="displayName" required onChange={handleChange} value={displayName}/> */}

                {/* <label>Email</label>
                <input type="email" name="email" required onChange={handleChange} value={email}/> */}

                {/* <label>Password</label>
                <input type="password" name="password" required onChange={handleChange} value={password} minLength={6}/> */}

                {/* <label>Confirm Password</label>
                <input type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} minLength={6}/> */}
                <Button type="submit" children="Sign Up"/>
                {/* <button type="submit">Sign Up</button> */}
            </form>
        </div>
    )
}

export default SignUpForm;