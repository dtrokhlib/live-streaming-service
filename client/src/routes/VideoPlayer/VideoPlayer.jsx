import axios from 'axios';
import './VideoPlayer.module.css';
import React from 'react';
import videojs from 'video.js';

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

        this.initPlayer = this.initPlayer.bind(this);
    }

    async componentDidMount() {
        let { data: RTMPServerConfig } = await axios.get(
            'http://localhost:5050/streams/config'
        );
        this.initPlayer(RTMPServerConfig);
    }

    initPlayer(RTMPServerConfig) {
        const url = window.location.href.split('/');
        const username = url[url.length - 1];
        axios
            .get('http://localhost:5050/streams/user', {
                params: {
                    username,
                },
            })
            .then((res) => {
                this.setState(
                    {
                        stream: true,
                        videoJsOptions: {
                            autoplay: false,
                            controls: true,
                            sources: [
                                {
                                    src:
                                        'http://127.0.0.1:' +
                                        RTMPServerConfig.http.port +
                                        '/live/' +
                                        res.data.streamKey +
                                        '/index.m3u8',
                                    type: 'application/x-mpegURL',
                                },
                            ],
                            fluid: true,
                        },
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
            <div className='row video-block'>
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
