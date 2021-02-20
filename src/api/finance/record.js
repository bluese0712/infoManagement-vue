import axios from '../axiosConfig';

const api = {
    // 根据条件获取财务记录
    getRecordListByParams: (pageCurrent, pageSize, startTime, endTime, categoryID) => axios.post('/api/cw/record/getRecordListByParams', {
        pageSize: pageSize,
        pageCurrent: pageCurrent,
        startTime: startTime,
        endTime: endTime,
        categoryID: categoryID
    }),
    // 创建财务记录
    createCWRecord: (dissipate, amount, categoryID) => axios.post('/api/cw/record/createRecord', {
        dissipate: dissipate,
        amount: amount,
        categoryID: categoryID
    }),
    // 编辑财务记录
    editCWRecord: (recordID, dissipate, amount) => axios.post('/api/cw/record/editRecord', {
        recordID: recordID,
        dissipate: dissipate,
        amount: amount
    }),
    // 删除财务记录
    deleteRecord: (recordID) => axios.post('/api/cw/record/deleteRecord', { recordID: recordID }),
    // 获取财务总和
    getFinancialSum: () => axios.get('/api/cw/record/getFinancialSum')
};
export default api;
