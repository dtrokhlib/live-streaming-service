import axios from 'axios';
import { Navigate } from 'react-router-dom';
import React from 'react';
import videojs from 'video.js';
import { RTMPServerConfig } from '../../config/RTMP-server.config';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'token'
)}`;
export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: false,
            videoJsOptions: null,
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5050/user').then((res) => {
            this.state(
                {
                    stream: true,
                    controls: true,
                    sources: [
                        {
                            src:
                                'http://localhost:' +
                                RTMPServerConfig.http.port +
                                '/live/' +
                                res.data.stream_key +
                                '/index.m3u8',
                            type: 'application/x-mpegURL',
                        },
                    ],
                    fluid: true,
                },
                () => {
                    this.player = videojs(
                        this.videoNode,
                        this.state.videoJsOptions,
                        function onPlayerReady() {
                            console.log('onPlayerReady', this);
                        }
                    );
                }
            );
        });
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5'>
                    {this.state.stream ? (
                        <div data-vjs-player>
                            <video
                                ref={(node) => (this.videoNode = node)}
                                className='video-js vjs-big-play-centered'
                            />
                        </div>
                    ) : (
                        ' Loading ... '
                    )}
                </div>
            </div>
        );
    }
}
