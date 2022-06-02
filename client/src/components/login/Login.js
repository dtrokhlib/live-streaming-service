import React, { useState } from 'react';
import './Login.css';
import logo from './assets/logo.png';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function localLogin(e) {
        console.log('clicked', email.value, password.value);

        const data = await axios.post('http://127.0.0.1:5050/auth/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
        });

        const parsedData = await data.json();

        console.log(parsedData);
    }

    return (
        <div className='Login'>
            <div className='mb-3 Logo'>
                <img src={logo} width='200px' alt='logo' />
            </div>
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
                        type='submit'
                        onClick={localLogin}
                        className='btn btn-light btn-login btn-login'
                    >
                        Submit
                    </button>
                </div>
                <div className='mb-3 button-block'>
                    Does not have an account?
                    <button type='button' className='btn btn-link'>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
