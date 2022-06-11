import NodeMediaServer from 'node-media-server';
import { RTMPServerConfig } from '../../config/RTMP-server.config';
import { User } from './user/User.model';
import { generateStreamThumbnail } from './utils/generate-stream-thumbnail';

export const RTMPConfig: any = RTMPServerConfig;
export const nodeMediaServer = new NodeMediaServer(RTMPConfig);

nodeMediaServer.on(
    'prePublish',
    async (id: any, StreamPath: any, args: any) => {
        let streamKey = getStreamKeyFromStreamPath(StreamPath);

        const user = await User.findOne({ streamKey });

        if (!user) {
            let session: any = nodeMediaServer.getSession(id);
            session.reject();
        } else {
            generateStreamThumbnail(streamKey);
        }

        console.log(
            '[NodeEvent on prePublish]',
            `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
    }
);

const getStreamKeyFromStreamPath = (path: string) => {
    let parts = path.split('/');
    return parts[parts.length - 1];
};
