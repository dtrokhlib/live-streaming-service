import { CronJob } from 'cron';
import axios from 'axios';
import { generateStreamThumbnail } from './generate-stream-thumbnail';
import { RTMPServerConfig } from '../../../config/RTMP-server.config';

const url = `http://127.0.0.1:${RTMPServerConfig.http.port}`;

export const cronThumbnailGenerateJob = new CronJob(
    '*/5 * * * * *',
    () => {
        axios
            .get(url + '/api/streams')
            .then((response) => {
                let streams = response.data;
                if (typeof (streams['live'] !== undefined)) {
                    let live_streams = streams['live'];
                    for (let stream in live_streams) {
                        if (!live_streams.hasOwnProperty(stream)) continue;
                        generateStreamThumbnail(stream);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    null,
    true
);
