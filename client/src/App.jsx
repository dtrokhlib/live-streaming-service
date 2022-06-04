import './App.css';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import React, { useEffect } from 'react';
import { isAuthenticated } from './api/isAuthenticated';

function App() {
    isAuthenticated();

    return (
        <div className='App'>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default App;
