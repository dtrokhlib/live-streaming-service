import { spawn } from 'child_process';
import { RTMPServerConfig } from '../../../config/RTMP-server.config';

const cmd = RTMPServerConfig.trans.ffmpeg;

export const generateStreamThumbnail = (streamKey: string) => {
    const ffmpegArgs = [
        '-y',
        '-i',
        'http://localhost:8888/live/' + streamKey + '/index.m3u8',
        '-ss',
        '00:00:01',
        '-vframes',
        '1',
        '-vf',
        'scale=-2:300',
        './thumbnails/' + streamKey + '.png',
    ];

    spawn(cmd, ffmpegArgs, {
        detached: true,
        stdio: 'ignore',
    }).unref();
};
