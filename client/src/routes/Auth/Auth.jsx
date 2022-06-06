import React, { useState } from 'react';
import './Auth.css';
import logo from './assets/logo.png';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { Navigate } from 'react-router-dom';

export default class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authMode: true,
        };
        this.switchAuthState = this.switchAuthState.bind(this);
    }

    switchAuthState() {
        this.setState({ authMode: !this.state.authMode });
    }

    render() {
        return (
            <div className='Auth'>
                <div className='mb-3 Logo'>
                    <img src={logo} width='200px' alt='logo' />
                </div>
                {this.state.authMode && (
                    <Login switchAuthState={this.switchAuthState} />
                )}
                {!this.state.authMode && (
                    <Register switchAuthState={this.switchAuthState} />
                )}
            </div>
        );
    }
}
