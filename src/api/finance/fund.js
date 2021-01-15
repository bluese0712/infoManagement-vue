import axios from '../axiosConfig';

const api = {
    // 根据条件获取类别记录
    getFundCode: () => axios.get('http://fund.eastmoney.com/js/fundcode_search.js'),
    // 创建财务记录
    createRecord: (categoryID, amount, dissipate) => axios.post('/api/cw/record/createRecord', {
        pageNum: categoryID,
        limit: amount,
        checkMonth: dissipate
    })
};
export default api;
