import React from 'react';
import './Header.css';

function Header() {
    return (
        <nav className='header navbar navbar-expand-lg navbar-dark bg-dark'>
            <ul className='navbar-nav'>
                <li className='nav-item active'>
                    <a className='nav-link' href='/'>
                        Home
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>
                        Features
                    </a>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='/'>
                        Pricing
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
