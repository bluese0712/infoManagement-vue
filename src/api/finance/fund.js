import axios from '../axiosConfig';

const api = {
    // 根据条件获取基金
    getFundListByParams: (matchField) => axios.post('/api/cw/fund/getFundListByParams', { matchField: matchField }),
    // 根据确认时间和基金ID获取购买时的基金数据
    getFundEquityByFundCode: (fundID, confirmationTime) => axios.post('/api/cw/fund/getFundEquityByFundCode', { fundID: fundID, confirmationTime: confirmationTime }),
    // 更新所有基金列表
    updateFund: () => axios.post('/api/cw/userFund/updateFund')
};
export default api;
