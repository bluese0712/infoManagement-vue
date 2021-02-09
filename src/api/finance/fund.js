import axios from '../axiosConfig';

const api = {
    // 根据条件获取基金条件
    getFundListByParams: (matchField) => axios.post('/api/cw/fund/getFundListByParams', { matchField: matchField }),
    // 根据确认时间和基金ID获取购买时的基金数据
    getFundEquityByFundCode: (fundID, confirmationTime) => axios.post('/api/cw/fund/getFundEquityByFundCode', { fundID: fundID, confirmationTime: confirmationTime }),
    // 添加角色所有基金和对应赎回规则
    addUserFundAndRedemptionRules: (fundID, bitTime, bidNAV, bidShare, rules) => axios.post('/api/cw/fund/addUserFundAndRedemptionRules',
        {
            fundID: fundID,
            bitTime: bitTime,
            bidNAV: bidNAV,
            bidShare: bidShare,
            rules: rules
        }),
    getUserFundList: () => axios.post('/api/cw/fund/getUserFundList', { }),
    // 追加购买
    appendUserFund: (userFundID, bitTime, bidNAV, bidShare) => axios.post('/api/cw/fund/appendUserFund',
        {
            userFundID: userFundID,
            bitTime: bitTime,
            bidNAV: bidNAV,
            bidShare: bidShare
        })
};
export default api;
