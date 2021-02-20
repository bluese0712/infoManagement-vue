import axios from '../axiosConfig';

const api = {
    // 添加角色所有基金和对应赎回规则
    addUserFundAndRedemptionRules: (fundID, bitTime, bidNAV, bidShare, purchaseAmount, additionalCosts, bitRate, rules) => axios.post('/api/cw/userFund/addUserFundAndRedemptionRules',
        {
            fundID: fundID,
            bitTime: bitTime,
            bidNAV: bidNAV,
            bidShare: bidShare,
            purchaseAmount: purchaseAmount,
            additionalCosts: additionalCosts,
            bitRate: bitRate,
            rules: rules
        }),
    getUserFundList: () => axios.post('/api/cw/userFund/getUserFundList', { }),
    // 追加购买
    appendUserFund: (userFundID, bitTime, bidNAV, bidShare, purchaseAmount, additionalCosts) => axios.post('/api/cw/userFund/appendUserFund',
        {
            userFundID: userFundID,
            bitTime: bitTime,
            bidNAV: bidNAV,
            bidShare: bidShare,
            purchaseAmount: purchaseAmount,
            additionalCosts: additionalCosts
        }),
    // 更新持有的基金净值
    updateFundNAV: () => axios.post('/api/cw/userFund/updateFundNAV')
};
export default api;
