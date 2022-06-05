import React from 'react';
import './Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
        };
        this.onInputchange = this.onInputchange.bind(this);
        this.localLogin = this.localLogin.bind(this);
    }

    onInputchange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    localLogin(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        axios
            .post('http://localhost:5050/auth/login', userData, {
                withCredentials: true,
            })
            .then((res) => {
                this.setState({
                    redirect: true,
                });
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
                    <label className='form-label'>Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onInputchange}
                        type='password'
                        name='password'
                        autoComplete='true'
                        className='form-control'
                    />
                </div>
                <div className='mb-3 button-block'>
                    <button
                        onClick={this.localLogin}
                        className='btn btn-light btn-login'
                    >
                        Login
                    </button>
                </div>
                <div className='mb-3 button-block'>
                    Does not have an account?
                    <button
                        onClick={this.props.switchAuthState}
                        type='button'
                        className='btn btn-link'
                    >
                        Register
                    </button>
                </div>
                {this.state.redirect ? <Navigate to='/home' /> : null}
            </form>
        );
    }
}
