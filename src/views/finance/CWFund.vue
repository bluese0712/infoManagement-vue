<template>
    <div class="table-content">
        <div class="search-box">
            <el-form :model="formInline" size="mini" label-width="80px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="parameter = { type:'add' }">添加持有基金</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-box">
            <el-table size="mini" height="100%" :data="tableData" class="w-100">
                <el-table-column prop="fund.fundName" label="基金名"></el-table-column>
                <el-table-column prop="fund.fundCode" label="基金代码"></el-table-column>
                <el-table-column prop="totalShare" label="总份额"></el-table-column>
                <el-table-column prop="averageNAV" label="平均净值"></el-table-column>
                <el-table-column prop="newestNAV" label="最新净值"></el-table-column>
                <el-table-column prop="updateTIme" label="更新日期"></el-table-column>
                <el-table-column prop="earning" label="持有收益">
                    <template slot-scope="scope">
                        <span :class="scope.row.earning > 0?'earning-profit':'earning-loss'">{{(scope.row.earning > 0?'+':'') + scope.row.earning}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="earningRate" label="持有收益率">
                    <template slot-scope="scope">
                        <span :class="scope.row.earning > 0?'earning-profit':'earning-loss'">{{(scope.row.earning > 0?'+':'') + scope.row.earningRate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="parameter = {type: 'appendAdd', userFund: scope.row}" size="mini" type="success">追加购买</el-button>
                        <el-button size="mini" type="primary">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging-box">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
        <CWFundEdit :parameter="parameter" @confirm="getUserFundListByParams"></CWFundEdit>
    </div>
</template>

<script>
import api from '@/api';
import CWFundEdit from '@/components/finance/CWFundEdit.vue';
import { timestampToTemp } from '@/assets/js/common';
export default {
    name: 'cwfund',
    components: {
        CWFundEdit
    },
    data() {
        return {
            formInline: {},
            tableData: [],
            parameter: {}
        };
    },
    mounted() {
        this.getUserFundListByParams();
    },
    methods: {
        async getUserFundListByParams() {
            this.tableData = [];
            const res = await api.cwUserFund.getUserFundList();
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            for (let item of res.data) {
                item.averageNAV = Math.round((item.totalAmount / item.totalShare) * 10000) / 10000;
                item.updateTIme = timestampToTemp(item.updateTIme, '%Y-%M-%D');
                item.earning = parseInt(((item.newestNAV - item.averageNAV) * item.totalShare) * 100) / 100;
                item.earningRate = Math.round((item.earning / item.totalAmount) * 10000) / 100 + '%';
            }
            this.tableData = res.data;
        }
    }
};
</script>
<style lang="scss" scoped>
.earning-profit, .earning-loss {
    font-weight: 700;
}
.earning-profit {
    color: red;
}
.earning-loss {
    color: green;
}
</style>
