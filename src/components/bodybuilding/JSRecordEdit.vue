<template>
    <el-dialog :title="type === 'add'?'添加记录': '修改记录'" :visible.sync="dialogVisible" width="700px">
        <el-form ref="dialogForm" :model="dialogForm" size="mini" :rules="formRules" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="时间" prop="dissipate">
                        <el-date-picker v-model="dialogForm.recordingTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="体重" prop="weight">83
                        <el-input v-model="dialogForm.weight" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="胸围" prop="chest">93.4
                        <el-input v-model="dialogForm.chest" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="腰围" prop="waist">92.7
                        <el-input v-model="dialogForm.waist" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="臀围" prop="hipline">110
                        <el-input v-model="dialogForm.hipline" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="左大腿围" prop="leftThigh">61.3
                        <el-input v-model="dialogForm.leftThigh" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="右大腿围" prop="rightThigh">61.8
                        <el-input v-model="dialogForm.rightThigh" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="左小腿围" prop="leftCalf">36.3
                        <el-input v-model="dialogForm.leftCalf" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="右小腿围" prop="rightCalf">37.2
                        <el-input v-model="dialogForm.rightCalf" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="左大臂围" prop="leftBicep">31.5
                        <el-input v-model="dialogForm.leftBicep" @change="inputNumber"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="右大臂围" prop="rightBicep">31.8
                        <el-input v-model="dialogForm.rightBicep" @change="inputNumber"></el-input>
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
                amount: null
            },
            formRules: {
                dissipate: [{ required: true, message: '请选择消费时间', trigger: 'blur' }],
                amount: [{ required: true, message: '请填写消费金额', trigger: 'blur' }]
            }
        };
    },
    methods: {
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

        }
    }
};
</script>
