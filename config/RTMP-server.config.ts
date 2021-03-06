export const RTMPServerConfig = {
    server_host: 'http://localhost:5050',
    client_host: 'https://localhost:3000',

    server: {
        secret: 'fa129kOTivnRIA2ot84NT2312ASDASXZXX2321',
        port: 3333,
    },
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30,
    },
    http: {
        host: 'https://127.0.0.1',
        port: 8888,
        mediaroot: '../media',
        allow_origin: '*',
    },
    trans: {
        ffmpeg: 'C:/ffmpeg/bin/ffmpeg.exe',
        tasks: [
            {
                app: 'live',
                hls: true,
                hlsFlags:
                    '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            },
        ],
    },
};
