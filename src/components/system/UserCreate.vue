<template>
    <div>
        <el-dialog title="添加角色" :visible.sync="dialogVisible" width="700px" :close-on-click-modal="false">
            <el-form ref="dialogForm" :model="dialogForm" size="small" :rules="formRules" label-width="90px" v-loading="createLoading">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="userName">
                            <el-input v-model="dialogForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="dialogForm.nickName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="dialogForm.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="text-right mt-5">
                    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="createConfirm" size="mini">确 定</el-button>
                </div>
            </el-form>
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
            this.dialogVisible = true;
        }
    },
    data() {
        return {
            type: '',
            dialogVisible: false,
            createLoading: false,
            dialogForm: {
                userName: '',
                nickName: '',
                password: ''
            },
            formRules: {
                userName: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
                nickName: [{ required: true, message: '请填写昵称', trigger: 'blur' }],
                password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        // 创建字段验证
        createConfirm() {
            this.$refs.dialogForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.createUser();
            });
        },
        // 创建
        async createUser() {
            this.createLoading = true;
            const res = await api.user.createUser(this.dialogForm.userName, this.dialogForm.nickName, this.dialogForm.password);
            this.createLoading = false;
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
