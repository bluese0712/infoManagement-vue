<template>
    <div>
        <!-- 添加基金第一次购买记录 -->
        <el-dialog :title="type==='add'?'基金购买':'基金追加购买'" :visible.sync="dialogVisible" width="700px" @closed="dialogClosed"
        :close-on-click-modal="false" :close-on-press-escape="!createLoading" :show-close="!createLoading">
            <el-form ref="dialogForm" :model="dialogForm" size="small" :rules="formRules" label-width="90px" v-loading="createLoading">
                <el-row>
                    <el-col :span="24" v-if="type==='add'">
                        <el-form-item label="基金" prop="fundID">
                            <el-select v-model="dialogForm.fundID" placeholder="请填写基金代码，名称或简称" filterable clearable :filter-method="fundFilter" class="w-100">
                                <el-option v-for="item in options" :key="item.fundID" :label="item.fundName" :value="item.fundID">
                                    <span style="float: left">{{ item.fundName }}</span>
                                    <span style="float: right;color: #8492a6; font-size: 13px">{{ item.fundCode }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="type!=='add'">
                        <el-form-item label="基金">
                            <span v-html="confirmForm.fundCode + '-' + confirmForm.fundName"></span>
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
                    <el-col :span="24" v-if="type==='add'">
                        <el-divider content-position="left" style="margin: 12px 0;color: red">赎回费率</el-divider>
                    </el-col>
                    <el-col :span="24" v-if="rateArray.length !== 0 && type==='add'">
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
                    <el-col :span="24" class="py-10" v-if="!rateForm.isEnd && type==='add'">
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
        <!-- 确认信息 -->
        <el-dialog title="信息确认" :visible.sync="confirmDialogVisible" width="500px" :close-on-click-modal="false" :close-on-press-escape="!confirmLoading" :show-close="!confirmLoading">
            <el-row v-loading="confirmLoading">
                <el-col :span="4" class="show-label">基金名称：</el-col><el-col :span="20" class="show-label" v-html="confirmForm.fundName"></el-col>
                <el-col :span="4" class="show-label">基金代码：</el-col><el-col :span="20" class="show-label" v-html="confirmForm.fundCode"></el-col>
                <el-col :span="4" class="show-label">购时净值：</el-col><el-col :span="20" class="show-label" v-html="confirmForm.bidNAV"></el-col>
                <el-col :span="4" class="show-label">确定份额：</el-col><el-col :span="20" class="show-label" v-html="confirmForm.bidShare"></el-col>
                <el-col :span="4" class="show-label">确定时间：</el-col><el-col :span="20" class="show-label" v-html="confirmForm.bitTime"></el-col>
                <el-col :span="4" class="show-label">购买金额：</el-col><el-col :span="20" class="show-label" v-html="confirmForm.purchaseAmount"></el-col>
                <el-col :span="24" class="show-label" v-if="type==='add'">
                    <el-divider content-position="left" style="margin: 12px 0;color: red">赎回费率</el-divider>
                </el-col>
                <el-col :span="24" v-if="rateArray.length !== 0 && type==='add'">
                    <el-row class="rate-header">
                        <el-col :span="18">持有期限</el-col>
                        <el-col :span="4">费率</el-col>
                    </el-row>
                    <el-row v-for="(item, index) in rateArray" :key="index" class="rate-column">
                        <el-col :span="18" v-html="item.minDays + ' ≤ 持有天数' + (item.maxDays?' &lt; ' + item.maxDays:'')"></el-col>
                        <el-col :span="4" v-html="item.rate + '%'"></el-col>
                    </el-row>
                </el-col>
                <el-col :span="24" class="mt-10">
                    <el-button type="primary" @click="type==='add'?addUserFundAndRedemptionRules():appendUserFund()" size="mini" style="width:100%">确 定</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
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
            if (val.type === 'add') {
                return;
            }
            this.dialogForm.fundID = val.fund.fund.fundID;
            this.confirmForm.userFundID = val.fund.userFundID;
            this.confirmForm.fundName = val.fund.fund.fundName;
            this.confirmForm.fundCode = val.fund.fund.fundCode;
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
                fundID: '',
                confirmationTime: '',
                shares: ''
            },
            confirmForm: {
                userFundID: '',
                fundID: '',
                fundName: '',
                fundCode: '',
                bidNAV: '',
                bidShare: '',
                bitTime: '',
                purchaseAmount: ''
            },
            formRules: {
                fundID: [{ required: true, message: '请选择基金', trigger: 'blur' }],
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
            options: [],
            timer: null
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
        // 验证字段是否填写
        createConfirm() {
            this.$refs.dialogForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                this.getFundEquityByFundCode();
            });
        },
        // 根据时间和基金编号获取购买的真正时间和净值
        async getFundEquityByFundCode() {
            this.createLoading = true;
            const res = await api.cwFund.getFundEquityByFundCode(this.dialogForm.fundID, timestampToTemp(this.dialogForm.confirmationTime));
            this.createLoading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            if (this.type === 'add') {
                this.confirmForm.fundID = this.dialogForm.fundID;
                for (const fund of this.options) {
                    if (fund.fundID === this.dialogForm.fundID) {
                        this.confirmForm.fundName = fund.fundName;
                        this.confirmForm.fundCode = fund.fundCode;
                    }
                }
            }
            this.confirmForm.bidNAV = res.data.DWJZ;
            this.confirmForm.bidShare = this.dialogForm.shares;
            this.confirmForm.bitTime = timestampToTemp(this.dialogForm.confirmationTime, '%Y-%M-%D');
            this.confirmForm.purchaseAmount = parseFloat(parseFloat(res.data.DWJZ) * parseFloat(this.dialogForm.shares)).toFixed(2);
            this.confirmDialogVisible = true;
        },
        // 添加基金购买记录和赎回规则
        async addUserFundAndRedemptionRules() {
            this.confirmLoading = true;
            const res = await api.cwFund.addUserFundAndRedemptionRules(this.confirmForm.fundID, this.confirmForm.bitTime + ' 12:00:00', this.confirmForm.bidNAV, this.confirmForm.bidShare, JSON.stringify(this.rateArray));
            this.confirmLoading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
            }
            this.$message({ type: 'success', message: '添加成功' });
            this.confirmDialogVisible = false;
            this.dialogVisible = false;
            this.$emit('confirm');
        },
        // 追加购买基金
        async appendUserFund() {
            this.confirmLoading = true;
            const res = await api.cwFund.appendUserFund(this.confirmForm.userFundID, this.confirmForm.bitTime + ' 12:00:00', this.confirmForm.bidNAV, this.confirmForm.bidShare);
            this.confirmLoading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
            }
            this.$message({ type: 'success', message: '添加成功' });
            this.confirmDialogVisible = false;
            this.dialogVisible = false;
            this.$emit('confirm');
        },
        // 基金赛选
        fundFilter(val) {
            if (val) { // val存在
                window.clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    this.getFundListByParams(val);
                }, 300);
            } else { // val为空时，还原数组
                this.options = [];
                window.clearTimeout(this.timer);
            }
        },
        // 根据字段的模糊搜索基金
        async getFundListByParams(val) {
            const res = await api.cwFund.getFundListByParams(val.toUpperCase());
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.options = res.data;
        },
        // 窗口关闭时清空所有数据
        dialogClosed() {
            this.dialogForm = {
                fundID: '',
                confirmationTime: '',
                shares: ''
            };
            this.rateArray = [];
            this.options = [];
            this.timer = null;
            this.rateForm = {
                minDays: '0',
                maxDays: '',
                rate: '',
                isEnd: false
            };
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
.show-label{
    line-height: 30px;
}
</style>
<style scoped>
.minDays >>> .el-input__inner {
    text-align: right;
}
</style>
