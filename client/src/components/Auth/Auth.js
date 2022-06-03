import React, { useState } from 'react';
import './Auth.css';
import logo from './assets/logo.png';
import Login from '../Login/Login';
import Register from '../Register/Register';

function Auth() {
    const [authMode, setAuthMode] = useState(true);

    function switchAuthState() {
        console.log('switch');
        setAuthMode(!authMode);
        console.log(authMode);
    }

    return (
        <div className='Auth'>
            <div className='mb-3 Logo'>
                <img src={logo} width='200px' alt='logo' />
            </div>
            {authMode && <Login switchAuthState={switchAuthState} />}
            {!authMode && <Register switchAuthState={switchAuthState} />}
        </div>
    );
}

export default Auth;
