import './App.css';
import Header from './components/Header/Header';
import React from 'react';
import axios from 'axios';
import Auth from './routes/Auth/Auth';
import LiveStreams from './routes/LiveStreams/LiveStreams';
import VideoPlayer from './routes/VideoPlayer/VideoPlayer';
import Settings from './routes/Settings/Settings';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: true,
            user: '',
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios
            .get('http://localhost:5050/auth/is-authenticated', {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    this.setState({
                        authenticated: true,
                        user: res.data,
                    });
                }
            })
            .catch((err) => {
                this.setState({
                    authenticated: false,
                    user: '',
                });
            });
    }

    async logout(e) {
        e.preventDefault();

        await axios.post('http://localhost:5050/auth/logout', {
            withCredentials: true,
        });

        this.setState({
            loggedOut: !this.state.loggedOut,
        });

        window.location.href = '/';
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
                                isAuthenticated={this.state.authenticated}
                                element={<Auth />}
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
                        </Routes>
                    </BrowserRouter>
                </main>
            </div>
        );
    }
}
