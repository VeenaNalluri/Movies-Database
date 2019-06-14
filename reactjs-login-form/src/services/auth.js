import axios from 'axios'

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    console.log("error", error)
    if (error.response.status === 401) {
        console.log('unauthorized, logging out ...');
        // auth.logout();
        // router.replace('/auth/login');
    }
    return Promise.reject(error);
});

export const userLogin = (params) => {
    console.log("user", JSON.stringify(params))
    return axios.post(`http://localhost:3000/v1/users/auth`, params, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }})
      .then(e => e)
      .catch(e => e.response)
}