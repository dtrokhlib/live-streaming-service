import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import style from './LiveStreams.module.css';

export class LiveStreams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streams: [],
        };

        this.getLiveStreams = this.getLiveStreams.bind(this);
        this.getStreamsInfo = this.getStreamsInfo.bind(this);
        this.streams = this.streams.bind(this);
    }

    async componentDidMount() {
        let { data: RTMPServerConfig } = await axios.get(
            'http://localhost:5050/streams/config'
        );
        this.getLiveStreams(RTMPServerConfig);
    }

    getLiveStreams(RTMPServerConfig) {
        axios
            .get(`http://localhost:${RTMPServerConfig.http.port}/api/streams`)
            .then((res) => {
                let streams = res.data;
                if (typeof streams['live'] !== 'undefined') {
                    this.getStreamsInfo(streams['live']);
                }
            });
    }

    getStreamsInfo(liveStreams) {
        axios
            .get('http://localhost:5050/streams/info', {
                params: {
                    streams: liveStreams,
                },
            })
            .then((res) => {
                this.setState({ streams: res.data });
            });
    }

    streams() {
        return this.state.streams.map((stream, index) => {
            return (
                <div
                    className='stream col-xs-12 col-sm-12 col-md-3 col-lg-4'
                    key={index}
                >
                    <span className='live-label'>LIVE</span>
                    <Link to={'/stream/' + stream.username}>
                        <div className='stream-thumbnail'>
                            <img
                                align='center'
                                alt=''
                                width={450}
                                src={
                                    'http://localhost:5050/thumbnails/' +
                                    stream.streamKey +
                                    '.png'
                                }
                            />
                        </div>
                    </Link>

                    <span className='username'>
                        <Link to={'/stream/' + stream.username}>
                            {stream.username}
                        </Link>
                    </span>
                </div>
            );
        });
    }

    render() {
        return (
            <div className={style.streamContainer}>
                <h4>Live Streams</h4>
                <hr className='my-4' />

                <div className='streams row'>{this.streams()}</div>
            </div>
        );
    }
}

export default LiveStreams;
