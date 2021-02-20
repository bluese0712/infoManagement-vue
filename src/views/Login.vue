<template>
    <div class="w-100 h-100 main-box">
        <div class="child-box">
            <div class="login-title">系统登陆</div>
            <el-form ref="loginForm" :model="loginForm" class="login-form" :rules="formRules">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="密码" :type="passwordType?'text': 'password'">
                        <i slot="suffix" class="el-input__icon el-icon-view pointer" @click="passwordType = !passwordType"></i>
                    </el-input>
                </el-form-item>
                <div class="mb-10">
                    <el-checkbox v-model="savePassword" label="保存密码" name="type" style="color:#fff"></el-checkbox>
                </div>
                <el-form-item>
                    <el-button type="primary" native-type=“submit” @click="loginSubmit" :loading="loading" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import { timestampToTemp } from '@/assets/js/common';
import JSEncrypt from 'jsencrypt';
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                userName: localStorage.getItem('BLUE_FEATHER_SAVEPWD') ? localStorage.getItem('BLUE_FEATHER_USERNAME') : '',
                password: localStorage.getItem('BLUE_FEATHER_SAVEPWD') ? localStorage.getItem('BLUE_FEATHER_PASSWORD') : ''
            },
            savePassword: !!localStorage.getItem('BLUE_FEATHER_SAVEPWD'),
            passwordType: false,
            loading: false,
            formRules: {
                userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        loginSubmit() {
            this.$refs.loginForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.loading = true;
                this.judgeHasPublicKey();
            });
        },
        // 判断是否存在可用公钥
        judgeHasPublicKey() {
            let time = localStorage.getItem('putlicKeyGetTime');
            if (time && timestampToTemp(time, '%Y-%M-%D') === timestampToTemp(new Date(), '%Y-%M-%D')) {
                let publicKey = localStorage.getItem('publicKey');
                this.loadingSubmit(this.encryptionPwd(publicKey));
                return;
            }
            this.getRSAPublicKey();
        },
        // 加密
        encryptionPwd(pubKey) {
            let encryptStr = new JSEncrypt();
            encryptStr.setPublicKey(pubKey); // 设置 加密公钥
            let data = encryptStr.encrypt(JSON.stringify({ password: this.loginForm.password, encryptionTime: timestampToTemp(new Date(), '%Y-%M-%D %h:%m:%s') })); // 进行加密
            return data;
        },
        // 获取RSA公钥
        async getRSAPublicKey() {
            const res = await api.common.getRSAPublicKey();
            if (res.code !== 200) {
                this.$message.error(res.msg);
                return;
            }
            localStorage.setItem('publicKey', res.data);
            localStorage.setItem('putlicKeyGetTime', timestampToTemp(new Date(), '%Y-%M-%D %h:%m:%s'));
            this.loadingSubmit(this.encryptionPwd(res.data));
        },
        // 登录
        async loadingSubmit(pwd) {
            const res = await api.common.login(this.loginForm.userName, pwd);
            this.loading = false;
            if (res.code !== 200) {
                this.$message.error(res.msg);
                return;
            }
            localStorage.setItem('BLUE_FEATHER_SAVEPWD', this.savePassword);
            localStorage.setItem('BLUE_FEATHER_USERNAME', this.savePassword ? this.loginForm.userName : '');
            localStorage.setItem('BLUE_FEATHER_PASSWORD', this.savePassword ? this.loginForm.password : '');
            this.$store.commit('saveUserInfo', res.data);
            this.$router.push('/index');
        }
    }
};
</script>

<style lang="scss" scoped>
.main-box {
    position: relative;
    background: -moz-linear-gradient(left top, #2d3a4b 0%, #1e2835 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#2d3a4b), color-stop(100%,#1e2835));
    background: -webkit-linear-gradient(left top, #2d3a4b 0%,#1e2835 100%);
    background: -o-linear-gradient(left top, #2d3a4b 0%,#1e2835 100%);
    background: -ms-linear-gradient(left top, #2d3a4b 0%,#1e2835 100%);
    background: linear-gradient(to right bottom, #2d3a4b 0%,#1e2835 100%);
}
.child-box {
    position: absolute;
    top: 20%;
    left: 50%;
    transform:translate(-50%, -50%);
    -ms-transform:translate(-50%, -50%);  /* IE 9 */
    -moz-transform:translate(-50%, -50%); /* Firefox */
    -webkit-transform:translate(-50%, -50%); /* Safari 和 Chrome */
    -o-transform:translate(-50%, -50%);  /* Opera */
}
.login-title {
    font-size: 26px;
    color: #eee;
    margin: 0 auto 30px auto;
    text-align: center;
    font-weight: 700;
    letter-spacing: 5px;
}
.login-form {
    width: 400px;
    color: #fff;
}
</style>
<style scoped>
.login-form >>> .el-input__inner {
    color: #fff;
    background: rgba(0,0,0,.1);
    border: 1px solid hsla(0,0%,100%,.1);
    height: 50px;
    font-size: 14px;
}
</style>
