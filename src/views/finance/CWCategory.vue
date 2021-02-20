<template>
    <div class="table-content" v-loading="loading">
        <div class="table-box grid-Box">
            <div v-for="item of pinList" :key="item.categoryID" class="pin pin-initial" :class="item.type === 0?'pin-red': 'pin-green'" :ref="'pin-' + item.categoryID">
                <div class="pin-title p-relative">
                    <span class="p-relative">
                        {{item.categoryName}}
                        <i class="el-icon-edit p-right" style="right: -10px" @click="parameter = {type: 'edit',category: item}"></i>
                    </span>
                    <i class="el-icon-delete p-right" style="right:5px" @click="parentClose(item)"></i>
                </div>
                <div class="pin-nav-list">
                    <el-tag v-for="child of item.children" :key="child.categoryID" :type="item.type === 0?'danger': 'success'" closable class="pointer"
                        @close="childrenClose(child)" @click="parameter={type: 'edit',category: child}">{{child.categoryName}}</el-tag>
                    <div class="pin-add" @click="parameter = { type: 'childrenAdd', parent: item }"><i class="el-icon-plus"></i></div>
                </div>
            </div>
            <div class="pin pin-initial" ref="pin-add" v-if="isLoading" @click="parameter = { type: 'parentAdd' }">
                <div class="pin-add-parent">
                    <div class="border">
                        <i class="el-icon-plus"></i>
                    </div>
                </div>
            </div>
        </div>
        <CWCategoryEdit :parameter="parameter" @confirm="refreshTree"></CWCategoryEdit>
    </div>
</template>

<script>
import api from '@/api';
import CWCategoryEdit from '@/components/finance/CWCategoryEdit.vue';
import method from '@/method';
export default {
    name: 'cwrecord',
    components: {
        CWCategoryEdit
    },
    data() {
        return {
            loading: false,
            parameter: {},
            pinList: [],
            isLoading: false,
            columnNum: 0
        };
    },
    mounted() {
        this.refreshTree();
        window.addEventListener('resize', this.onResize);
    },
    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        // 刷新收支项树
        refreshTree() {
            this.loading = true;
            this.isLoading = false;
            method.cw.getAllCategory().then((val) => {
                this.pinList = val;
                this.isLoading = true;
                setTimeout(() => {
                    this.waterfallFlowLayout();
                }, 300);
            });
        },
        // 形成瀑布流
        waterfallFlowLayout() {
            const eleArray = this.$refs;
            let columnHeight = document.body.offsetWidth < 768 ? [0, 0] : document.body.offsetWidth < 992 ? [0, 0, 0] : document.body.offsetWidth < 1200 ? [0, 0, 0, 0] : document.body.offsetWidth < 1920 ? [0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0, 0, 0];
            this.columnNum = columnHeight.length;
            const leftNum = 100 / columnHeight.length;
            for (const key in eleArray) {
                if (key.indexOf('pin-') !== 0) {
                    continue;
                }
                if (this.$refs[key].length === 0) {
                    continue;
                }
                const el = this.$refs[key][0] ? this.$refs[key][0] : this.$refs[key];
                el.className = el.className.replace('pin-initial', 'pin-waterfall');
                const appendIndex = this.getMinimumColumn(columnHeight);
                el.style.top = columnHeight[appendIndex] + 'px';
                el.style.left = (leftNum * appendIndex) + '%';
                columnHeight[appendIndex] += el.getBoundingClientRect().height;
            }
            setTimeout(() => {
                this.loading = false;
            }, 300);
        },
        // 获取最短的那一列
        getMinimumColumn(array) {
            if (array.length <= 1) {
                return 0;
            }
            let idnex = 0;
            for (let i = 1; i < array.length; i++) {
                if (array[idnex] > array[i]) {
                    idnex = i;
                }
            }
            return idnex;
        },
        // 页面变化时判断瀑布流是否改变列数
        onResize() {
            this.waterfallFlowLayout();
        },
        parentClose(val) {
            this.$confirm('此操作将删除该主项 ' + val.categoryName + ' 及其所有子项, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                this.deleteCategory(val.categoryID);
            }).catch(() => {});
        },
        childrenClose(val) {
            this.$confirm('此操作将删除该子项 ' + val.categoryName + ' , 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                this.deleteCategory(val.categoryID);
            }).catch(() => {});
        },
        async deleteCategory(id) {
            this.loading = true;
            const res = await api.cwCategory.deleteCWCategory(id);
            this.loading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.refreshTree();
        }
    }
};
</script>
<style lang="scss" scoped>
.p-right {
    position: absolute;
    letter-spacing: 0;
    line-height: 35px;
    cursor: pointer;
}
.table-box.grid-Box {
    background-color: transparent;
    position: relative;

}
.pin {
    padding: 0 5px;
    box-sizing: border-box;
    padding-top: 10px;
    .pin-add {
        border: 1px solid;
    }
    .pin-add,.pin-input {
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        margin-top: 5px;
        cursor: pointer;
    }
}
@media only screen and (max-width: 767px) {
    .pin {
        width: 50%;
    }
}
@media only screen and (min-width: 768px) {
    .pin {
        width: 33.33333%;
    }
}
@media only screen and (min-width: 992px) {
    .pin {
        width: 25%;
    }
}
@media only screen and (min-width: 1200px) {
    .pin {
        width: 20%;
    }
}
@media only screen and (min-width: 1920px) {
    .pin {
        width: 12.5%;
    }
}
.pin-initial {
    float: left;
}
.pin-waterfall {
    position: absolute;
}
.pin-red {
    .pin-title {
        background-color: #F55151;
    }
    .pin-add {
        border-color: #F56C6C;
        color: #F56C6C;
    }
}
.pin-green {
    .pin-title {
        background-color: #5DC22B;
    }
    .pin-add {
        border-color: #5DC22B;
        color: #5DC22B;
    }
}
.pin-title {
    color: #fff;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    text-align: center;
    letter-spacing:20px;
}
.pin-nav-list {
    background-color: #fff;
    padding: 10px 10px;
    text-align: center;
}
.pin-nav {
    color: #FFF;
}
.el-tag {
    margin: 4px 3px;
}
.pin-add-parent {
    height: 100px;
    text-align: center;
    line-height: 100px;
    background: #fff;
    padding: 8px;
    .border {
        border: 1px solid #DCDFE6;
        color: #DCDFE6;
        border-radius: 10px;
    }
}
</style>
