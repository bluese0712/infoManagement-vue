<template>
    <div>
        <el-dialog title="收支项选择" :visible.sync="dialogVisible" width="800px">
            <div class="box-wrapper">
                <div class="box" v-for="item of categoryTree" :key="item.categoryID">
                    <div class="pin" :class="item.type === 0?'': 'pin-success'">{{item.categoryName}}</div>
                    <div>
                        <el-tag v-for="child of item.children" :key="child.categoryID" :type="item.type === 0?'danger': 'success'" class="pointer"
                            @click="selectCategory(child)">{{child.categoryName}}</el-tag>
                    </div>
                </div>
            </div>
        </el-dialog>
        <el-dialog :title="type === 'add'?'添加'+ category.categoryName +'的记录': '修改记录'" :visible.sync="inputDialogVisible" width="600px">
            <el-form ref="dialogForm" :model="dialogForm" size="mini" :rules="formRules" label-width="80px" @keyup.enter.native="createConfirm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="时间" prop="dissipate">
                            <el-date-picker v-model="dialogForm.dissipate" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="金额" prop="amount">
                            <el-input v-model="dialogForm.amount" @change="inputNumber($event, true)" @input="inputNumber($event, false)" ref="amount"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="text-right">
                    <el-button @click="inputDialogVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click.enter.native="submitConfirm" size="mini">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/api';
import { timestampToTemp } from '@/assets/js/common';
import method from '@/method';
export default {
    name: 'cwrecordedit',
    props: {
        parameter: { type: Object }
    },
    watch: {
        parameter(val) {
            this.type = val.type;
            if (this.type === 'edit') {
                this.inputDialogVisible = true;
                this.record = val.record;
                this.dialogForm = {
                    dissipate: new Date(this.record.dissipate.replace('-', '/')),
                    amount: parseFloat(this.record.amount)
                };
                return;
            }
            this.dialogVisible = true;
        }
    },
    data() {
        return {
            type: '',
            dialogVisible: false,
            inputDialogVisible: false,
            dialogForm: {
                dissipate: new Date(),
                amount: null
            },
            formRules: {
                dissipate: [{ required: true, message: '请选择消费时间', trigger: 'blur' }],
                amount: [{ required: true, message: '请填写消费金额', trigger: 'blur' }]
            },
            categoryTree: [],
            category: {},
            record: null
        };
    },
    mounted() {
        // 获取收支项书
        method.cw.getAllCategory().then((val) => {
            for (const item of val) {
                if (item.children.length === 0) {
                    continue;
                }
                this.categoryTree.push(item);
            }
        });
    },
    methods: {
        // 收支项选择时触发
        selectCategory(val) {
            this.category = val;
            this.dialogForm = {
                dissipate: new Date(),
                amount: null
            };
            this.inputDialogVisible = true;
            setTimeout(() => {
                this.$refs.amount.focus();
            }, 0);
        },
        // 支付金额验证
        inputNumber(val, isEnd) {
            this.dialogForm.amount = this.dialogForm.amount.replace(/[^\d.]/g, '');
            if (this.dialogForm.amount.split('.').length > 2) {
                this.dialogForm.amount = this.dialogForm.amount.split('.')[0] + '.' + this.dialogForm.amount.split('.')[1];
            }
            if (isEnd) {
                this.dialogForm.amount = parseFloat(this.dialogForm.amount).toString();
            }
        },
        // 创建输入项验证
        submitConfirm() {
            this.$refs.dialogForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                switch (this.type) {
                case 'add':
                    this.createCWRecord();
                    break;
                case 'edit':
                    this.editCWRecord();
                    break;
                }
            });
        },
        // 创建收支记录
        async createCWRecord() {
            const res = await api.cwRecord.createCWRecord(timestampToTemp(this.dialogForm.dissipate), this.dialogForm.amount, this.category.categoryID);
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.$message({ type: 'success', message: '创建成功' });
            this.inputDialogVisible = false;
            this.$emit('confirm');
        },
        // 编辑收支记录
        async editCWRecord() {
            const res = await api.cwRecord.editCWRecord(this.record.recordID, timestampToTemp(this.dialogForm.dissipate), this.dialogForm.amount);
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.$message({ type: 'success', message: '编辑成功' });
            this.inputDialogVisible = false;
            this.$emit('confirm');
        }
    }
};
</script>
<style scoped>
.box {
    margin-top:1em;
    break-inside:avoid;
}
.box:first-child {
    margin-top: 0px;
}
.box-wrapper {
    column-count:2;
    column-gap:5px;
}
.pin {
    padding-left: 10px;
    position: relative;
    height: 30px;
    line-height: 30px;
}
.pin::after {
    content: "";
    height: 18px;
    width: 3px;
    position: absolute;
    background: red;
    left: 0;
    top: 6px;
}
.pin-success::after {
    background: #00ab00;
}
.el-tag {
    margin-left: 10px;
    margin-top: 5px;
}
</style>
