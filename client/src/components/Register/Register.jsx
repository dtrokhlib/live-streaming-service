import React from 'react';
import './Register.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            redirect: false,
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.localRegister = this.localRegister.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    localRegister(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
        };

        axios
            .post('http://localhost:5050/auth/register', userData)
            .then((res) => {
                this.setState({
                    redirect: true,
                });
                localStorage.setItem('token', res.data.token);
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <form>
                <div className='mb-3'>
                    <label className='form-label'>Email address</label>
                    <input
                        value={this.state.email}
                        onChange={this.onInputchange}
                        type='email'
                        name='email'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onInputchange}
                        name='username'
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onInputchange}
                        name='password'
                        type='password'
                        autoComplete='true'
                        className='form-control'
                    />
                </div>
                <div className='mb-3 button-block'>
                    <button
                        onClick={this.localRegister}
                        className='btn btn-light btn-login'
                    >
                        Register
                    </button>
                </div>
                <div className='mb-3 button-block'>
                    Have an account?
                    <button
                        type='button'
                        onClick={this.props.switchAuthState}
                        className='btn btn-link'
                    >
                        Login
                    </button>
                </div>
                {this.state.redirect ? <Navigate to='/home' /> : null}
            </form>
        );
    }
}
