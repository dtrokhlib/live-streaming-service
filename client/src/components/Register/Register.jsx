import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';

function Register({ switchAuthState }) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function localRegister(e) {
        e.preventDefault();

        const userData = {
            email: email.value,
            username: username.value,
            password: password.value,
        };

        axios
            .post('http://127.0.0.1:5050/auth/register', userData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                alert(JSON.stringify(err.response.data.message));
            });
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
                    aria-describedby='emailHelp'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input
                    ref={(value) => {
                        setUsername(value);
                    }}
                    type='text'
                    className='form-control'
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
                />
            </div>
            <div className='mb-3 button-block'>
                <button
                    onClick={localRegister}
                    className='btn btn-light btn-login'
                >
                    Register
                </button>
            </div>
            <div className='mb-3 button-block'>
                Have an account?
                <button
                    type='button'
                    onClick={switchAuthState}
                    className='btn btn-link'
                >
                    Login
                </button>
            </div>
        </form>
    );
}

export default Register;
