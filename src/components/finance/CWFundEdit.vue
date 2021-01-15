<template>
    <div>
        <el-dialog :title="type === 'add'?'添加记录': '修改记录'" :visible.sync="dialogVisible" width="700px"
            :close-on-click-modal="false" :close-on-press-escape="!createLoading" :show-close="!createLoading">
            <el-form ref="dialogForm" :model="dialogForm" size="small" :rules="formRules" label-width="90px" v-loading="createLoading">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="基金" prop="fundCode">
                            <el-select v-model="dialogForm.fundCode" placeholder="请填写基金代码，名称或简称" filterable clearable :filter-method="fundFilter" class="w-100">
                                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                    <span style="float: right;color: #8492a6; font-size: 13px">{{ item.code }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="确购时间" prop="confirmationTime">
                            <el-date-picker v-model="dialogForm.confirmationTime" type="date" placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买份额" prop="shares">
                            <el-input v-model="dialogForm.shares" @change="numberInput($event, 'shares', true)" @input="numberInput($event, 'shares')"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-divider content-position="left" style="margin: 12px 0;color: red">赎回费率</el-divider>
                    </el-col>
                    <el-col :span="24" v-if="rateArray.length !== 0">
                        <el-row class="rate-header">
                            <el-col :span="18">持有期限</el-col>
                            <el-col :span="4">费率</el-col>
                        </el-row>
                        <el-row v-for="(item, index) in rateArray" :key="index" class="rate-column">
                            <el-col :span="18" v-html="item.minDays + ' ≤ 持有天数' + (item.maxDays?' &lt; ' + item.maxDays:'')"></el-col>
                            <el-col :span="4" v-html="item.rate + '%'"></el-col>
                            <el-col :span="2" class="text-right" v-if="index === rateArray.length - 1">
                                <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                    <el-button type="danger" icon="el-icon-close" circle size="mini" @click="deleteRate"></el-button>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="24" class="py-10" v-if="!rateForm.isEnd" >
                        <el-row>
                            <el-col :span="4" class="minDays">
                                <el-input v-model="rateForm.minDays" class="text-right" size="mini" :disabled="true"></el-input>
                            </el-col>
                            <el-col :span="4" class="rate-text">≤ 持有天数 &lt;</el-col>
                            <el-col :span="4">
                                <el-input v-model="rateForm.maxDays" @change="numberInput($event, 'maxDays')" size="mini" @input="numberInput($event, 'maxDays')" @keyup.enter.native="addRate"></el-input>
                                </el-col>
                            <el-col :span="2" class="rate-text">费率:</el-col>
                            <el-col :span="5">
                                <el-input v-model="rateForm.rate" @change="numberInput($event, 'rate', true)" size="mini" @input="numberInput($event, 'rate')" @keyup.enter.native="addRate">
                                    <template slot="append">%</template>
                                </el-input>
                            </el-col>
                            <el-col :span="5" class="text-right">
                                <el-tooltip class="item" effect="dark" content="清空" placement="top">
                                    <el-button icon="el-icon-refresh-left" circle size="mini" @click="clearRate"></el-button>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" content="添加" placement="top">
                                    <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addRate"></el-button>
                                </el-tooltip>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <div class="text-right mt-5">
                    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="createConfirm" size="mini">确 定</el-button>
                </div>
            </el-form>
        </el-dialog>

        <el-dialog title="信息确认" :visible.sync="confirmDialogVisible" width="500px">
            <el-row>
                <el-col :span="4">基金名称：</el-col>
                <el-col :span="20">易方达蓝筹精选混合</el-col>
                <el-col :span="4">基金代码：</el-col>
                <el-col :span="20">005827</el-col>
                <el-col :span="4">购时净值：</el-col>
                <el-col :span="20">2.7045</el-col>
                <el-col :span="4">购买份额：</el-col>
                <el-col :span="20">27.56</el-col>
                <el-col :span="4">购买时间：</el-col>
                <el-col :span="20">2021-01-12</el-col>
                <el-col :span="4">购买金额：</el-col>
                <el-col :span="20">1997</el-col>
                <el-col :span="24">
                    <el-divider content-position="left" style="margin: 12px 0;color: red">赎回费率</el-divider>
                </el-col>
                <el-col :span="24" v-if="rateArray.length !== 0">
                    <el-row class="rate-header">
                        <el-col :span="18">持有期限</el-col>
                        <el-col :span="4">费率</el-col>
                    </el-row>
                    <el-row v-for="(item, index) in rateArray" :key="index" class="rate-column">
                        <el-col :span="18" v-html="item.minDays + ' ≤ 持有天数' + (item.maxDays?' &lt; ' + item.maxDays:'')"></el-col>
                        <el-col :span="4" v-html="item.rate + '%'"></el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
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
            confirmDialogVisible: false,
            createLoading: false,
            confirmLoading: false,
            dialogForm: {
                fundCode: '',
                confirmationTime: '',
                shares: ''
            },
            formRules: {
                fundCode: [{ required: true, message: '请选择基金', trigger: 'blur' }],
                confirmationTime: [{ required: true, message: '请选择确购时间', trigger: 'blur' }],
                shares: [{ required: true, message: '请填写购买份额', trigger: 'blur' }]
            },
            rateForm: {
                minDays: '0',
                maxDays: '',
                rate: '',
                isEnd: false
            },
            rateArray: [],
            options: [{
                value: 'Beijing',
                code: '001245',
                label: '北京'
            }, {
                value: 'Shanghai',
                code: '001245',
                label: '上海'
            }, {
                value: 'Nanjing',
                code: '001245',
                label: '南京'
            }, {
                value: 'Chengdu',
                code: '001245',
                label: '成都'
            }, {
                value: 'Shenzhen',
                code: '001245',
                label: '深圳'
            }, {
                value: 'Guangzhou',
                code: '004764',
                label: '广州'
            }],
            allOptions: [{
                value: 'Beijing',
                code: '001245',
                label: '北京'
            }, {
                value: 'Shanghai',
                code: '001245',
                label: '上海'
            }, {
                value: 'Nanjing',
                code: '001245',
                label: '南京'
            }, {
                value: 'Chengdu',
                code: '001245',
                label: '成都'
            }, {
                value: 'Shenzhen',
                code: '001245',
                label: '深圳'
            }, {
                value: 'Guangzhou',
                code: '004764',
                label: '广州'
            }]
        };
    },
    methods: {
        // 数字输入验证
        numberInput(val, prex, isEnd) {
            if (!val) {
                return;
            }
            switch (prex) {
            // 持有天数小于的值（整数）
            case 'maxDays':
                this.rateForm.maxDays = parseInt(val) ? parseInt(val) : '';
                break;
            // 费率（小数点后两位）
            case 'rate':
                this.rateForm.rate = val.replace(/[^\d.]/g, '');
                if (this.rateForm.rate[0] === '.') {
                    this.rateForm.rate = '0' + this.rateForm.rate;
                }
                if (isEnd) {
                    if (this.rateForm.rate[this.rateForm.rate.length - 1] === '.') {
                        this.rateForm.rate = this.rateForm.rate + '00';
                    }
                    this.rateForm.rate = parseFloat(this.rateForm.rate).toFixed(2);
                }
                if (this.rateForm.rate.split('.').length > 2) {
                    this.rateForm.rate = this.rateForm.rate.split('.')[0] + '.' + this.rateForm.rate.split('.')[1];
                }
                break;
            case 'shares':
                this.dialogForm.shares = this.dialogForm.shares.replace(/[^\d.]/g, '');
                if (this.dialogForm.shares.split('.').length > 2) {
                    this.dialogForm.shares = this.dialogForm.shares.split('.')[0] + '.' + this.dialogForm.shares.split('.')[1];
                }
                if (isEnd) {
                    this.dialogForm.shares = parseFloat(this.dialogForm.shares).toString();
                }
            }
        },
        // 添加赎回费率规则
        addRate() {
            if (!this.rateForm.rate) {
                this.rateForm.rate = '0.00';
            }
            const item = { minDays: this.rateForm.minDays, maxDays: this.rateForm.maxDays, rate: this.rateForm.rate };
            this.rateArray.push(item);
            this.rateForm = {
                minDays: this.rateForm.maxDays,
                maxDays: '',
                rate: '',
                isEnd: false
            };
            if (item.maxDays === '' || item.rate === '0.00') {
                this.rateForm.isEnd = true;
            }
        },
        // 清空赎回费率规则
        clearRate() {
            this.rateForm.maxDays = '';
            this.rateForm.rate = '';
        },
        // 删除最后一条赎回费率规则
        deleteRate() {
            this.rateArray.splice(this.rateArray.length - 1, 1);
            let item = this.rateArray[this.rateArray.length - 1];
            if (item && (item.maxDays === '' || item.rate === '0.00')) {
                this.rateForm.isEnd = true;
            } else {
                this.rateForm.isEnd = false;
                this.rateForm = {
                    minDays: item ? item.maxDays : '0',
                    maxDays: '',
                    rate: '',
                    isEnd: false
                };
            }
        },
        createConfirm() {
            this.$refs.dialogForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.getFundEquityByFundCode();
            });
        },
        async getFundEquityByFundCode() {
            this.createLoading = true;
            this.confirmDialogVisible = true;
        },
        async createCWRecord() {

        },
        fundFilter(val) {
            if (val) { // val存在
                this.options = this.allOptions.filter((item) => {
                    if (!!~item.label.indexOf(val) || !!~item.code.indexOf(val)) {
                        return true;
                    }
                });
            } else { // val为空时，还原数组
                this.options = this.optionsCopy;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.el-divider {
    margin: 12px 0;
}
.rate-text {
    height: 28px;
    line-height: 28px;
    text-align: center;
}
.rate-header {
    color: #909090;
    margin-top: 5px;
    height: 25px;
    line-height: 25px;
}
.rate-column {
    height: 35px;
    line-height: 35px;
    border-bottom: 1px solid #ddd;
}
.rate-column:last-child {
    border-bottom: none;
}
</style>
<style scoped>
.minDays >>> .el-input__inner {
    text-align: right;
}
</style>
