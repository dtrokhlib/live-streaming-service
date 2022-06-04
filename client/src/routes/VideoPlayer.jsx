import axios from 'axios';
import React, { useState, useEffect } from 'react';

function VideoPlayer() {
    
    const [stream, setStream] = useState(false);
    const [videoJsOptions, setVideoStream] = useState(null);

    useEffect(() => {
        axios.get()
    });

    return <div>VideoPlayer</div>;
}

export default VideoPlayer;
