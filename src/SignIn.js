
import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';
import { Link, Navigate } from 'react-router-dom';


function NewUser() {
    const [newdata, setNewData] = useState(null);
    const [newusername, setNewUserName] = useState('');
    const [newemail, setNewEmail] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [signinError, setSigninError] = useState({});

    //setSigninError({});
    const CheckUsername = () => {
        const userPattern = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
        if (!newusername) {
            setSigninError(prevError => ({ ...prevError, newusername: 'Username is required' }));
        } //else if (!userPattern.test(newusername)) {
        //setSigninError(prevError => ({ ...prevError, newusername: 'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters' }))} 
        else {
            setSigninError(prevError => ({ ...prevError, newusername: '' }));
        }
    }

    const CheckEmail = () => {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!newemail) {
            setSigninError(prevError => ({ ...prevError, newemail: 'Email is required' }));
        } else if (!emailPattern.test(newemail)) {
            setSigninError(prevError => ({ ...prevError, newemail: 'Enter valid Email format' }));
        } else {
            setSigninError(prevError => ({ ...prevError, newemail: '' }));

        }
    }

    const CheckPassword = () => {
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if (!newpassword) {
            setSigninError(prevError => ({ ...prevError, newpassword: 'Password is required' }));
        } else if (!passwordPattern.test(newpassword)) {
            setSigninError(prevError => ({ ...prevError, newpassword: 'Password requirements: 8-20 characters, 1 number, 1 Capital letter, 1 Small letter ,1 symbol' }));
        } else {
            setSigninError(prevError => ({ ...prevError, newpassword: '' }));
        }
    }

    const CheckConfirmpass = () => {
        if (!confirmpassword) {
            setSigninError(prevError => ({ ...prevError, confirmpassword: 'This feild is required' }));
        } else if (newpassword !== confirmpassword) {
            setSigninError(prevError => ({ ...prevError, confirmpassword: 'Password and Confirm Password are not same' }))
        } else {
            setSigninError(prevError => ({ ...prevError, confirmpassword: '' }));
        }
    }

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: 'POST',
                baseURL: 'http://127.0.0.1:8000/register/',
                data: {
                    "username": newusername,
                    "email": newemail,
                    "password1": newpassword,
                    "password2": confirmpassword
                },
            });
            setNewData(response.data);

            if (response.status === 200) {
                setSigninError({});
            }
        }
        catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.username) {
                setSigninError(prevError => ({ ...prevError, newusername: error.response.data.username }));
            }
            if (error.response && error.response.data && error.response.data.email) {
                setSigninError(prevError => ({ ...prevError, newemail: error.response.data.email }));
            }
            if (error.response && error.response.data && error.response.data.password1) {
                setSigninError(prevError => ({ ...prevError, newpassword: error.response.data.password1 }));
            }
            if (error.response && error.response.data && error.response.data.password2) {
                setSigninError(prevError => ({ ...prevError, confirmpassword: error.response.data.password2 }));
            }
            if (error.response && error.response.data && error.response.data.non_field_errors) {
                setSigninError(prevError => ({ ...prevError, general: error.response.data.non_field_errors }));
            }
        }
    };

    return (
        <>
            <div className='signin-main-container'>
                <h1>WelCome New User </h1>
                <h1> Sign Up </h1>
                <form onSubmit={addUser} id="signup-form">
                    <label htmlFor='Username'> Enter User Name</label>
                    <input type="text" placeholder="Enter Username" value={newusername} onChange={(e) => setNewUserName(e.target.value)} onBlur={CheckUsername} />
                    <p>{signinError.newusername}</p>
                    <br />
                    <label htmlFor='Email'> Enter E-Mail</label>
                    <input type="email" placeholder="Enter Mail" value={newemail} onChange={(e) => setNewEmail(e.target.value)} onBlur={CheckEmail} />
                    <p>{signinError.newemail}</p>
                    <br />
                    <label htmlFor='Password'> Enter Password</label>
                    <input type="password" placeholder="Enter Password" value={newpassword} onChange={(e) => setNewPassword(e.target.value)} onKeyUp={CheckPassword} />
                    <p>{signinError.newpassword}</p>
                    <br />
                    <label htmlFor='ConfirmPassword'> Confirm Password </label>
                    <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyUp={CheckConfirmpass} />
                    <p>{signinError.confirmpassword}</p>
                    <br />
                    <button type="submit" className='sign-btn'>Register</button>
                    <p>{signinError.general}</p>
                    {newdata && <p style={{ color: 'green' }}>User registered successfully!</p>}
                    {newdata && (<Navigate to='/' replace={true} />)}
                </form>
            </div>
            <br />
            <span> If Already a User <Link to='../Login' style={{
                textDecoration: 'none',
                color: '#1e1f26',
                background: 'transparent',
                fontSize: 'large'
            }}>Login</Link></span>
        </>
    );
}

export default NewUser;

