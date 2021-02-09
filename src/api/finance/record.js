import axios from '../axiosConfig';

const api = {
    // 根据条件获取财务记录
    getRecordListByParams: (pageNum, limit, time, sId, iId) => axios.post('/api/cw/record/getRecordListByParams', {
        pageNum: pageNum,
        limit: limit,
        checkMonth: time,
        'stock.stockID': sId,
        'item.itemID': iId
    }),
    // 创建财务记录
    createCWRecord: (dissipate, amount, categoryID) => axios.post('/api/cw/record/createRecord', {
        dissipate: dissipate,
        amount: amount,
        categoryID: categoryID
    })
};
export default api;
