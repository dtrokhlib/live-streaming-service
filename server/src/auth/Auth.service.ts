import axios, { AxiosResponse } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class AuthService {
    async accessTokenRequest(url: string): Promise<AxiosResponse> {
        const res = await axios(url, {
            method: 'GET',
        });
        const access_token = res.data
            .split('&')[0]
            .replace('access_token=', '');

        return access_token;
    }

    async gitHubProfileRequest(token: string) {
        const res = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });

        return res.data;
    }
}
