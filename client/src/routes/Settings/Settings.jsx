import React from 'react';
import { Navigate } from 'react-router-dom';

export default class Settings extends React.Component {
    
    constructor(props) {
        super(props)
        console.log(this.props)
    }

    render() {
        return (
            <div>
                <h1>Settings</h1>
                {!this.props.isAuthenticated ? <Navigate to='/auth' /> : null}
            </div>
        );
    }
}
