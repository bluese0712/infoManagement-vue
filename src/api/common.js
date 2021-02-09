import axios from './axiosConfig';

const api = {
    // 一键生成相应月份的盘点计划
    getRSAPublicKey: () => axios.get('/api//getRSAPublicKey'),
    // 根据条件获取盘点计划
    login: (userName, password) => axios.post('/api/login', {
        userName: userName,
        password: password
    })

};
export default api;
