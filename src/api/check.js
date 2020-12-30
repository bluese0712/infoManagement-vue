import axios from './axiosConfig';

const api = {
    // 一键生成相应月份的盘点计划
    createCheckPlan: (timeStr6) => axios.post('/checkPlan//createCheckPlan', { timeStr6: timeStr6 }),
    // 根据条件获取盘点计划
    getCheckPlanList: (pageNum, limit, time, sId, iId) => axios.post('/checkPlan/listCheckPlanByParamForPage', {
        pageNum: pageNum,
        limit: limit,
        checkMonth: time,
        'stock.stockID': sId,
        'item.itemID': iId
    }),
    // 根据条件获取盘点实际
    getCheckActualList: (pageNum, limit, time, sId, iId) => axios.post('/checkPlan/listCheckActualByParamForPage', {
        pageNum: pageNum,
        limit: limit,
        checkMonth: time,
        'stock.stockID': sId,
        'item.itemID': iId
    }),
    // 总结最终盘盈/盘亏
    selectInventoryWithoutAlreadyCheckPlan: (pageNum, limit, stockID) => axios.post('/LYZCCheckPlanV3/selectInventoryWithoutAlreadyCheckPlan', {
        pageNum: pageNum,
        limit: limit,
        stockID: stockID
    }),
    // 新增计划
    createCheckPlanForASRS: (lotNoAndItemIDJson, stockID) => axios.post('/LYZCCheckPlanV3/createCheckPlanForASRS', { lotNoAndItemIDJson: lotNoAndItemIDJson, stockID: stockID }),
    // 开始盘点
    startCheckPlanByStockID: (stockID) => axios.post('/LYZCCheckPlanV3/startCheckPlanByStockID', { stockID: stockID }),
    // 盘点开始查询
    listWaitForPutOnInStockEntry: (pageNum, limit, stockID, lotNo) => axios.post('/LYZCCheckPlanV3/listWaitForPutOnInStockEntry', {
        pageNum: pageNum,
        limit: limit,
        stockID: stockID,
        lotNo: lotNo
    }),
    // 根据物料和批号获取
    findWaitForPutOnInStockEntryByLotIDAndItemID: (itemID, lotNo) => axios.post('/LYZCCheckPlanV3/findWaitForPutOnInStockEntryByLotIDAndItemID', {
        itemID: itemID,
        lotNo: lotNo
    }),
    // 开始上架计划
    startPutOnInStockEntryAndVerify: (inStockEntryIDJson) => axios.post('/LYZCCheckPlanV3/startPutOnInStockEntryAndVerify', { inStockEntryIDJson: inStockEntryIDJson })
};
export default api;
