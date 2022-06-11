import axios from 'axios';
import React from 'react';
import { Navigate } from 'react-router-dom';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`;
export default class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            streamKey: '',
        };

        this.generateStreamKey = this.generateStreamKey.bind(this);
    }

    componentDidMount() {
        this.getStreamKey();
    }

    async generateStreamKey(e) {
        const res = await axios.post(
            'http://localhost:5050/streams/stream-key'
        );
        this.setState({
            streamKey: res.data.streamKey,
        });
    }

    async getStreamKey() {
        const res = await axios.get('http://localhost:5050/streams/stream-key');
        this.setState({
            streamKey: res.data.streamKey,
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className='container mt-5'>
                    <h4>Streaming Key</h4>
                    <hr className='my-4' />

                    <div className='col-xs-12 col-sm-12 col-md-8 col-lg-6'>
                        <div className='row'>
                            <h5>{this.state.streamKey}</h5>
                        </div>
                        <div className='row'>
                            <button
                                className='btn btn-dark mt-2'
                                onClick={this.generateStreamKey}
                            >
                                Generate a new key
                            </button>
                        </div>
                    </div>
                </div>

                <div className='container mt-5'>
                    <h4>How to Stream</h4>
                    <hr className='my-4' />

                    <div className='col-12'>
                        <div className='row'>
                            <p>
                                You can use
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://obsproject.com/'
                                >
                                    OBS
                                </a>
                                or
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href='https://www.xsplit.com/'
                                >
                                    XSplit
                                </a>
                                to Live stream. If you're using OBS, go to
                                Settings &gt Stream and select Custom from
                                service dropdown. Enter
                                <b>rtmp://127.0.0.1:1935/live</b> in server
                                input field. Also, add your stream key. Click
                                apply to save.
                            </p>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
