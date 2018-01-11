import http from './../../../common/utils/http';

export default data => new Promise((reject, resolve) => {
  http.post(`/auth/registration`, data)
    .then(resp => reject(resp))
    .catch(err => resolve(err));
});