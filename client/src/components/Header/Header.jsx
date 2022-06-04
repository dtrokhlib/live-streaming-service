import React from 'react';
import './Header.css';

function Header() {
    return (
        <nav className='header navbar navbar-expand-lg navbar-dark bg-dark'>
            <ul className='navbar-nav'>
                <li className='nav-item active'>
                    <a className='nav-link' href='/home'>
                        Home
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/settings'>
                        Settings
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/logout'>
                        Logout
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
