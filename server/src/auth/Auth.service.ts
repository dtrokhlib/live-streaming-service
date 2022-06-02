import axios, { AxiosResponse } from 'axios';
import { injectable } from 'inversify';
import { accessTokenRegexp, profilePath, tokenPath } from './Auth.constants';

@injectable()
export class AuthService {
    async accessTokenRequest(code: string) {
        const res = await axios.get(tokenPath, {
            params: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: code,
            },
        });

        return res.data.match(accessTokenRegexp)[1];
    }

    async gitHubProfileRequest(token: string) {
        const res = await axios.get(profilePath, {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        return res.data;
    }
}
