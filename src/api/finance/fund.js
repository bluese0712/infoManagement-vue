import axios from '../axiosConfig';

const api = {
    // 根据条件获取类别记录
    getFundListByParams: (matchField) => axios.post('/api/cw/fund/getFundListByParams', { matchField: matchField }),
    // 创建财务记录
    getFundEquityByFundCode: (fundID, confirmationTime) => axios.post('/api/cw/fund/getFundEquityByFundCode', { fundID: fundID, confirmationTime: confirmationTime })
};
export default api;
