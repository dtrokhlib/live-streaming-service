import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login({ switchAuthState }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function localLogin(e) {
        console.log('clicked', email.value, password.value);

        const userData = {
            email: email.value,
            password: password.value,
        };

        const data = await axios.post(
            'http://127.0.0.1:5050/auth/register',
            userData
        );
        console.log(data);

        const parsedData = await data.json();

        console.log(parsedData);
    }

    return (
        <form>
            <div className='mb-3'>
                <label className='form-label'>Email address</label>
                <input
                    ref={(value) => {
                        setEmail(value);
                    }}
                    type='email'
                    className='form-control'
                    id='exampleInputEmail1'
                    aria-describedby='emailHelp'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input
                    ref={(value) => {
                        setPassword(value);
                    }}
                    type='password'
                    autoComplete='true'
                    className='form-control'
                    id='exampleInputPassword1'
                />
            </div>
            <div className='mb-3 button-block'>
                <button
                    onClick={localLogin}
                    className='btn btn-light btn-login'
                >
                    Login
                </button>
            </div>
            <div className='mb-3 button-block'>
                Does not have an account?
                <button
                    onClick={switchAuthState}
                    type='button'
                    className='btn btn-link'
                >
                    Register
                </button>
            </div>
        </form>
    );
}

export default Login;
