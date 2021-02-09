import axios from '../axiosConfig';

const api = {
    // 创建收支项
    createCWCategory: (categoryID, categoryName, type) => axios.post('/api/cw/category/createCategory', { categoryID: categoryID, categoryName: categoryName, type: type }),
    // 编辑收支项
    editCWCategory: (categoryID, categoryName) => axios.post('/api/cw/category/editCategory', { categoryID: categoryID, categoryName: categoryName }),
    // 删除收支项
    deleteCWCategory: (categoryID) => axios.post('/api/cw/category/deleteCategory', { categoryID: categoryID }),
    // 获取对应子项
    getChildrenCategory: (type) => axios.post('/api/cw/category/getChildrenCategory', { type: type }),
    // 获取全部收支项
    getAllCategory: () => axios.get('/api/cw/category/getAllCategory')
};
export default api;
