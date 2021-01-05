import axios from '../axiosConfig';

const api = {
    // 根据条件获取类别记录
    getCategoryListByParams: (pageNum, limit, time, sId, iId) => axios.post('/api/cw/category/getCategoryListByParams', {
        pageNum: pageNum,
        limit: limit
    }),
    // 创建财务记录
    createRecord: (categoryID, amount, dissipate) => axios.post('/api/cw/record/createRecord', {
        pageNum: categoryID,
        limit: amount,
        checkMonth: dissipate
    })
};
export default api;
