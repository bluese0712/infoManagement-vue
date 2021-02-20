<template>
    <div class="table-content">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8" class="mb-5">
                <div class="assets assets-total">
                    <div class="assets-icon"><i class="iconfont icon-renminbi"></i></div>
                    <div class="assets-content">
                        <div class="label">总资产</div>
                        <span class="num">{{capital.total}}</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="mb-5">
                <div class="assets assets-branch">
                    <div class="assets-content">
                        <div class="label">流动资金</div>
                        <span class="num">{{capital.flow}}</span>
                    </div>
                    <div class="assets-progress">
                        <el-progress type="dashboard" :percentage="76.54" :color="'#000'" :width="80"></el-progress>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
                <div class="assets assets-branch">
                    <div class="assets-content">
                        <div class="label">基金总额</div>
                        <span class="num">{{capital.fund}}</span>
                    </div>
                    <div class="assets-progress">
                        <el-progress type="dashboard" :percentage="76.54" :color="'#000'" :width="80"></el-progress>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api';
import { thousandSeparator } from '@/assets/js/common.js';
// import CWRecordEdit from '@/components/finance/CWRecordEdit.vue';
export default {
    name: 'cwtotalAssets',
    data() {
        return {
            capital: {
                total: 0,
                flow: 0,
                fund: 0
            }
        };
    },
    mounted() {
        this.getFinancialSum();
    },
    methods: {
        async getFinancialSum() {
            const res = await api.cwRecord.getFinancialSum();
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            console.log(res);
            let flowNum = 0;
            for (const item of res.data.total) {
                switch (item.type) {
                case 1:
                    flowNum -= parseFloat(item.sum);
                    break;
                case 0:
                    flowNum += parseFloat(item.sum);
                    break;
                case -1:
                    flowNum -= parseFloat(item.sum);
                    break;
                case -2:
                    flowNum += parseFloat(item.sum);
                    break;
                }
            }
            let fundNum = 0;
            for (const fund of res.data.fund) {
                fundNum += (fund.newestNAV * fund.totalShare);
            }
            this.capital.flow = thousandSeparator(flowNum);
            this.capital.fund = thousandSeparator(parseFloat(fundNum).toFixed(2));
            this.capital.total = thousandSeparator(parseFloat(flowNum + fundNum).toFixed(2));
        }
    }
};
</script>
<style lang="scss" scoped>
.assets {
    height: 100px;
    background-color: #fff;
    box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
    border-radius: 5px;
    .assets-progress {
        margin: 10px 20px 10px 0;
        float: right;
    }
}
.assets-total {
    .assets-icon {
        padding-left: 20px;
        padding-top: 20px;
        float: left;
        .iconfont {
            font-size: 60px;
            color: #f4516c;
        }
    }
    .assets-content {
        float: right;
    }
}
.assets-content {
    font-weight: 700;
    margin: 23px 20px 23px 0;
    .label {
        font-size: 16px;
        line-height: 18px;
        margin-bottom: 10px;
        color: rgba(0,0,0,.45);
    }
    .num {
        color: #666;
        font-size: 20px;
    }
}
.assets-branch {
    .assets-content {
        float: left;
        margin-left: 20px;
        margin-right: 0;
    }
}
</style>
