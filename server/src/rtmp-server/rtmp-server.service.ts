import { throws } from 'assert';
import { RTMPServerConfig } from '../../../config/RTMP-server.config';
import NodeMediaServer from 'node-media-server';

export class RTMPServerService {
    private readonly config: any;
    private readonly nodeMediaServer: any;

    constructor() {
        this.config = RTMPServerConfig;
        this.nodeMediaServer = new NodeMediaServer(this.config);
    }

    getStreamKeyFromStreamPath(path: any) {
        let parts = path.split('/');
        return parts[parts.length - 1];
    }

    init() {
        this.nodeMediaServer.on(
            'prePublish',
            async (id: any, StreamPath: any, args: any) => {
                let stream_key = this.getStreamKeyFromStreamPath(StreamPath);
                console.log(
                    '[NodeEvent on prePublish]',
                    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(
                        args
                    )}`
                );
            }
        );
        this.nodeMediaServer.run();
    }
}
