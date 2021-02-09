import axios from './axiosConfig';

const api = {
    getUserListByParams: (pageNum, pageSize, userName, nickName) => axios.post('/api/user/getUserListByParams', {
        pageNum: pageNum,
        pageSize: pageSize,
        userName: userName,
        nickName: nickName
    }),
    // 添加角色
    createUser: (userName, nickName, password) => axios.post('/api/user/createUser', { userName: userName, nickName: nickName, password: password }),
    // 删除角色
    deleteUser: (userID) => axios.post('/api/user/deleteUser', { userID: userID })
};
export default api;
