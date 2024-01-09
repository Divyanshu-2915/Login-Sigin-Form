import axios from "axios";
import React, { useState } from "react";
import './Login.css';
import { Link, Navigate } from "react-router-dom";


function LoginUser() {
    const [data, setData] = useState(null);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState({}); // State for storing validation errors
    //const [loginSuccess, setLoginSuccess] = useState(false);

    const CheckUser = () => {
        if (username === '') {
            setLoginError(prevError => ({ ...prevError, username: 'Username is required' }));
        } else {
            setLoginError(prevError => ({ ...prevError, username: '' }));
        }
    }

    const CheckEmail = () => {
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (email === '') {
            setLoginError(prevError => ({ ...prevError, email: 'Email is required' }));
        } else if (!emailPattern.test(email)) {
            setLoginError(prevError => ({ ...prevError, email: 'Enter valid Email format' }));
        } else {
            setLoginError(prevError => ({ ...prevError, email: '' }));
        }
    }

    const CheckPassword = () => {
        const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if (!passwordPattern.test(password)) {
            setLoginError(prevError => ({ ...prevError, password: 'Password Pattern is Incorrect' }));
        } else {
            setLoginError(prevError => ({ ...prevError, password: '' }));
        }
    }

    const userLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/login/', {
                username: username,
                email: email,
                password: password,
            });

            setData(response.data);

            // Check for successful login (status code 200)
            if (response.status === 200) {
                // Clear any previous errors on successful login
                setLoginError({});
                //setLoginSuccess(true);
            }
        } catch (error) {
            console.error('Error during login:', error);
            if (error.response && error.response.data && error.response.data.username) {
                setLoginError(prevError => ({ ...prevError, username: error.response.data.username }));
            }
            if (error.response && error.response.data && error.response.data.email) {
                setLoginError(prevError => ({ ...prevError, email: error.response.data.email }));
            }
            if (error.response && error.response.data && error.response.data.password1) {
                setLoginError(prevError => ({ ...prevError, password: error.response.data.password }));
            }
            if (error.response && error.response.data && error.response.data.non_field_errors) {
                setLoginError(prevError => ({ ...prevError, general: error.response.data.non_field_errors }));
            }
        }
    };


    return (
        <>
            <div className="login-main-container">
                <h1> WelCome User </h1>
                <h1> Log In </h1>
                <form onSubmit={userLogin} id="signin-form">
                    <label htmlFor='Username'> Enter User Name</label>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUserName(e.target.value)} onBlur={CheckUser} />
                    {/* Display specific username error message */}
                    <p>{loginError.username}</p>
                    <br />
                    <label htmlFor='Email'> Enter E-Mail</label>
                    <input type="email" placeholder="Enter Mail" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={CheckEmail} />
                    {/* Display specific email error message */}
                    <p>{loginError.email}</p>
                    <br />
                    <label htmlFor='Password'> Enter Password</label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={CheckPassword} />
                    {/* Display specific password error message */}
                    <p>{loginError.password}</p>
                    <br />
                    <button type="submit" className="login-btn">Login</button>
                    {/* Display general error message */}
                    <p>{loginError.general}</p>
                    {data && <p style={{ color: 'green' }}>Login Successfully !</p>}
                    {data && (<Navigate to='/' replace={true} />)}
                </form>
            </div>
            <br />
            <span> If New to Us <Link to='../SignIn' style={{
                textDecoration: 'none',
                color: '#1e1f26',
                background: 'transparent',
                fontSize: 'large'
            }}>Signin</Link></span>
        </>
    );
}

export default LoginUser;
