import api from '@/api';
import { Message } from 'element-ui';

export default {
    // 获取收支项树
    async getAllCategory() {
        const res = await api.cwCategory.getAllCategory();
        if (res.code !== 200) {
            Message({ type: 'error', message: res.msg });
            return;
        }
        let parentMap = new Map();
        for (let item of res.data) {
            if (item.parentID === 0) {
                item.children = [];
                if (parentMap.has(item.categoryID)) {
                    continue;
                }
                parentMap.set(item.categoryID, item);
                continue;
            }
            if (parentMap.has(item.parentID)) {
                let parent = parentMap.get(item.parentID);
                parent.children.push(item);
                parentMap.set(item.parentID, parent);
                continue;
            }
            let parent = item.parent;
            parent.children = [item];
            parentMap.set(item.parentID, parent);
        }
        let array = [];
        parentMap.forEach(val => {
            array.push(val);
        });
        return array;
    }
};
