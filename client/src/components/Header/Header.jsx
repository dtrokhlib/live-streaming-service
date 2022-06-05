import React from 'react';
import './Header.css';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default class Header extends React.Component {
    render() {
        return (
            <nav className='header navbar navbar-expand-lg navbar-dark bg-dark'>
                <ul className='navbar-nav'>
                    <li className='nav-item active'>
                        <a className='nav-link' href='/home'>
                            Home
                        </a>
                    </li>
                    {!this.props.isAuthenticated && (
                        <li className='nav-item'>
                            <a className='nav-link' href='/auth'>
                                Auth
                            </a>
                        </li>
                    )}
                    {this.props.isAuthenticated && (
                        <li className='nav-item'>
                            <a className='nav-link' href='/settings'>
                                Settings
                            </a>
                        </li>
                    )}
                    {this.props.isAuthenticated && (
                        <li className='nav-item'>
                            <a
                                className='nav-link'
                                onClick={this.props.logout}
                                href='/'
                            >
                                Logout
                            </a>
                        </li>
                    )}
                </ul>
            </nav>
        );
    }
}
