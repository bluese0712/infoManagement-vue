<template>
    <div>
        <el-dialog :title="type === 'childrenAdd'?'添加子项': '添加主项'" :visible.sync="dialogVisible" width="400px" @closed="categoryName = '';categoryType=['收入']"
            :close-on-click-modal="false" :close-on-press-escape="!createLoading" :show-close="!createLoading">
            <el-row v-loading="createLoading">
                <el-col :span="24" v-if="type === 'childrenAdd'">
                    请输入 <span style="color: #409EFF;font-size: 18px;font-weight: 600">{{parent.categoryName}}</span> 的子项名：
                </el-col>
                <el-col :span="24" v-if="type === 'parentAdd'">
                    请输入主项名：
                </el-col>
                <el-col :span="24" class="mt-10">
                    <el-input v-model="categoryName" size="mini"></el-input>
                </el-col>
                <el-col :span="24" class="mt-10" v-if="type === 'parentAdd'">
                    主项类别：
                </el-col>
                <el-col :span="24" class="mt-10" v-if="type === 'parentAdd'">
                    <el-checkbox-group v-model="categoryType">
                        <el-checkbox label="收入" @change="typeChange($event, 'income')"></el-checkbox>
                        <el-checkbox label="支出" @change="typeChange($event, 'pay')"></el-checkbox>
                        <el-checkbox label="其他" @change="typeChange($event, 'other')"></el-checkbox>
                    </el-checkbox-group>
                </el-col>
                <el-col :span="24" class="text-right mt-10">
                    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="createConfirm" size="mini" :disabled="categoryName === ''">确 定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
        <el-dialog title="项目名编辑" :visible.sync="editDialogVisible" width="400px" @closed="categoryName = '';categoryType=['收入']"
            :close-on-click-modal="false" :close-on-press-escape="!createLoading" :show-close="!createLoading">
            <el-row v-loading="createLoading">
                <el-col :span="24">
                    <span style="font-size: 18px;font-weight: 600">{{category.parent?category.parent.categoryName:''}}</span> {{category.parent?'的':''}}
                    <span style="color: #409EFF;font-size: 18px;font-weight: 600">{{category.categoryName}}</span> 将替换成：
                </el-col>
                <el-col :span="24" class="mt-10">
                    <el-input v-model="categoryName" size="mini"></el-input>
                </el-col>
                <el-col :span="24" class="text-right mt-10">
                    <el-button @click="editDialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="editConfirm" size="mini" :disabled="categoryName === ''">确 定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api';
export default {
    name: 'cwrecordedit',
    props: {
        parameter: { type: Object }
    },
    watch: {
        parameter(val) {
            this.type = val.type;
            if (val.type === 'edit') {
                this.category = val.category;
                this.editDialogVisible = true;
                return;
            }
            this.parent = val.type === 'childrenAdd' ? val.parent : {};
            this.dialogVisible = true;
        }
    },
    data() {
        return {
            type: '',
            dialogVisible: false,
            editDialogVisible: false,
            createLoading: false,
            categoryType: ['收入'],
            parent: {},
            categoryName: '',
            category: { parent: {} }
        };
    },
    mounted() {
    },
    methods: {
        // 主项类别选择触发
        typeChange(val, type) {
            switch (type) {
            case 'income':
                this.categoryType = ['收入'];
                break;
            case 'pay':
                this.categoryType = ['支出'];
                break;
            case 'other':
                this.categoryType = ['其他'];
                break;
            }
        },
        // 创建确认
        createConfirm() {
            const txt = this.type === 'childrenAdd' ? '确定添加' + this.parent.categoryName + '的子项' + this.categoryName + '?' : '确认添加主项' + this.categoryName + '?';
            this.$confirm(txt, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                this.createLoading = true;
                this.createCWCategory();
            }).catch(() => { });
        },
        // 创建收支项
        async createCWCategory() {
            const type = this.type === 'childrenAdd' ? null : this.categoryType[0] === '收入' ? 1 : this.categoryType[0] === '支出' ? 2 : 0;
            const res = await api.cwCategory.createCWCategory(this.parent.categoryID, this.categoryName, type);
            this.createLoading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.dialogVisible = false;
            this.$emit('confirm');
        },
        editConfirm() {
            const txt = '确定将主项' + (this.category.parent ? this.category.parent.categoryName + '下的' : '') + this.category.categoryName + '更改为' + this.categoryName + '?';
            this.$confirm(txt, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                this.createLoading = true;
                this.editCWCategory();
            }).catch(() => { });
        },
        // 修改收支项
        async editCWCategory() {
            const res = await api.cwCategory.editCWCategory(this.category.categoryID, this.categoryName);
            this.createLoading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.editDialogVisible = false;
            this.$emit('confirm');
        }
    }
};
</script>
