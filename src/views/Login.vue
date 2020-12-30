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
                    <el-button type="primary" native-type=“submit” @click="loginSubmit" style="width:100%">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                userName: '',
                password: ''
            },
            savePassword: false,
            passwordType: false,
            formRules: {
                userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        loginSubmit() {
            this.$router.push('/index');
            this.$refs.loginForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.login();
            });
        },
        async login() {
            // const res = await api.common.login();
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
