import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import Auth from './components/Auth/Auth';
import LiveStreams from './routes/LiveStreams';
import VideoPlayer from './routes/VideoPlayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='auth' element={<Auth />} />
                    <Route exact path='/home' element={<LiveStreams />} />

                    <Route
                        exact
                        path='/stream/:username'
                        element={<VideoPlayer />}
                    />

                    {/* <Route
                        exact
                        path='/settings'
                        render={(props) => <Settings {...props} />}
                    /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
