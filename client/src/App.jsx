import './App.css';
import Header from './components/Header/Header';
import React from 'react';
import axios from 'axios';
import Auth from './routes/Auth/Auth';
import LiveStreams from './routes/LiveStreams/LiveStreams';
import VideoPlayer from './routes/VideoPlayer/VideoPlayer';
import Settings from './routes/Settings/Settings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            user: {
                email: '',
                username: '',
                id: '',
            },
        };

        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        try {
            const res = await axios.get(
                'http://localhost:5050/auth/is-authenticated',
                {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );

            if (res.status !== 200) {
                throw new Error('Not authorized');
            }
            this.setState({
                authenticated: true,
                user: Object.assign(this.state.user, res.data),
            });
        } catch (err) {
            this.setState({
                authenticated: false,
                user: '',
            });
        }
    }

    async logout(e) {
        e.preventDefault();

        await axios.post('http://localhost:5050/auth/logout', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        this.setState({
            authenticated: false,
        });
    }

    render() {
        return (
            <div className='App'>
                <main>
                    <Header
                        logout={this.logout}
                        isAuthenticated={this.state.authenticated}
                    />
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path='auth'
                                element={
                                    <Auth
                                        isAuthenticated={
                                            this.state.authenticated
                                        }
                                    />
                                }
                            />
                            <Route
                                exact
                                path='/home'
                                isAuthenticated={this.state.authenticated}
                                element={<LiveStreams />}
                            />
                            <Route
                                exact
                                isAuthenticated={this.state.authenticated}
                                path='/stream/:username'
                                element={<VideoPlayer />}
                            />
                            <Route
                                exact
                                path='/settings'
                                element={
                                    <Settings
                                        isAuthenticated={
                                            this.state.authenticated
                                        }
                                    />
                                }
                            />
                            <Route
                                path='*'
                                exact={true}
                                component={<Navigate to='/home' />}
                            />
                        </Routes>
                    </BrowserRouter>
                </main>
            </div>
        );
    }
}
