import axios from 'axios';
import { Navigate } from 'react-router-dom';
import React from 'react';

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: false,
            videoJsOptions: null,
        };
    }

    render() {
        return (
            <div>
                <h1>VideoPlayer</h1>{' '}
                {!this.props.isAuthenticated ? <Navigate to='/auth' /> : null}
            </div>
        );
    }
}
