import React from "react";
import { Link } from "react-router-dom";
import './Main.css';


function MainPage() {
    //const location = useLocation();
    //const loginSuccessMsg = location.state && location.state.loginSuccessMsg;

    return (
        <>
            <div className="main-container">
                <h2> WelCome</h2>
                <h2> React Form Validation UI </h2>

                <div className="child-container">
                    <h4> New User </h4>
                    <button><Link to='./SignIn' style={{
                        textDecoration: 'none',
                        color: '#1e1f26',
                        background: 'transparent'
                    }}>Sign In</Link></button>
                </div>
                <div className="child-container">
                    <h4>Already Registered </h4>
                    <button><Link to='./Login' style={{
                        textDecoration: 'none',
                        color: '#1e1f26',
                        background: 'transparent'
                    }}>Log In </Link></button>
                </div>
            </div>
        </>
    )
}

export default MainPage;