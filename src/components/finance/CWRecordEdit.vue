<template>
    <el-dialog :title="type === 'add'?'添加记录': '修改记录'" :visible.sync="dialogVisible" width="600px">
        <el-form ref="dialogForm" :model="dialogForm" size="mini" :rules="formRules" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="时间" prop="dissipate">
                        <el-date-picker v-model="dialogForm.dissipate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="金额" prop="amount">
                        <el-input v-model="dialogForm.amount" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="支出项" prop="categoryID">
                        <el-select v-model="dialogForm.categoryID" placeholder="请选择" style="width: 100%">
                            <el-option v-for="item in categoryList" :key="item.categoryID" :label="item.categoryName" :value="item.categoryID"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <div class="text-right">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="createConfirm" size="mini">确 定</el-button>
            </div>
        </el-form>

    </el-dialog>
</template>

<script>
import api from '@/api';
import { timestampToTemp } from '@/assets/js/method';
export default {
    name: 'cwrecordedit',
    props: {
        parameter: { type: Object }
    },
    watch: {
        parameter(val) {
            this.type = val.type;
            this.dialogVisible = true;
            console.log(val);
        }
    },
    data() {
        return {
            type: '',
            dialogVisible: false,
            dialogForm: {
                dissipate: new Date(),
                amount: null,
                categoryID: ''
            },
            formRules: {
                dissipate: [{ required: true, message: '请选择消费时间', trigger: 'blur' }],
                amount: [{ required: true, message: '请填写消费金额', trigger: 'blur' }],
                categoryID: [{ required: true, message: '请选择支出项', trigger: 'blur' }]
            },
            categoryList: []
        };
    },
    mounted() {
        this.getChildrenCategory();
    },
    methods: {
        async getChildrenCategory() {
            const res = await api.cwCategory.getChildrenCategory(1);
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.categoryList = res.data;
        },
        inputNumber() {
            this.dialogForm.amount = this.dialogForm.amount.replace(/[^\d.]/g, '');
            this.dialogForm.amount = this.dialogForm.amount ? parseFloat(this.dialogForm.amount).toString() : '';
        },
        createConfirm() {
            this.$refs.dialogForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.createCWRecord();
            });
        },
        async createCWRecord() {
            const res = await api.cwRecord.createCWRecord(timestampToTemp(this.dialogForm.dissipate), this.dialogForm.amount, this.dialogForm.categoryID);
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.dialogVisible = false;
            this.$emit('confirm');
        }
    }
};
</script>
