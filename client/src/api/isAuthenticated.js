import axios from 'axios';

export const isAuthenticated = () => {
    axios.get('http://127.0.0.1:5050/auth/is-authenticated').then((res) => {
        if (res.status === 200) {
            console.log(res.data);
            localStorage.setItem('user', res.data.user);
        }
    });
};
