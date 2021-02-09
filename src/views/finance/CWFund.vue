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
            <el-table size="mini" height="100%" :data="tableData" class="w-100" row-key="id">
                <el-table-column prop="fund.fundName" label="基金名"></el-table-column>
                <el-table-column prop="fund.fundCode" label="基金代码"></el-table-column>
                <el-table-column prop="bitTime" label="买入日期"></el-table-column>
                <el-table-column prop="bidShare" label="总份额/购买份额"></el-table-column>
                <el-table-column prop="bidNAV" label="平均净值/购买净值"></el-table-column>
                <el-table-column prop="latestNAV" label="最新净值"></el-table-column>
                <el-table-column prop="latestTime" label="更新日期"></el-table-column>
                <el-table-column prop="offerTime" label="卖出日期"></el-table-column>
                <el-table-column prop="offerShare" label="总卖出份额/卖出份额"></el-table-column>
                <el-table-column prop="offerNAV" label="平均卖出净值/卖出净值"></el-table-column>
                <el-table-column prop="stockReturn" label="总收益/持有收益"></el-table-column>
                <el-table-column prop="stockReturnVolatility" label="总收益率/持有收益率"></el-table-column>
                <el-table-column label="操作" width="330">
                    <template slot-scope="scope">
                        <el-button @click="parameter = {type: 'appendAdd', fund: scope.row}" size="mini" type="primary">追加购买</el-button>
                        <el-button @click="handleClick(scope.row)" size="mini" type="primary">分红管理</el-button>
                        <el-button size="mini" type="success">赎回</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
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
import { timestampToTemp } from '@/assets/js/method';
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
            const res = await api.cwFund.getUserFundList();
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            let fundMap = new Map();
            for (let item of res.data) {
                item.bitTime = timestampToTemp(item.bitTime, '%Y-%M-%D');
                item.latestTime = timestampToTemp(item.latestTime, '%Y-%M-%D');
                let array = fundMap.has(item.fundID) ? fundMap.get(item.fundID) : [];
                array.push(item);
                fundMap.set(item.fundID, array);
            }
            let num = 1;
            fundMap.forEach(array => {
                let parent = {
                    id: num,
                    userFundID: array[0].userFundID,
                    fundID: array[0].fundID,
                    fund: array[0].fund,
                    bitTime: '',
                    bidShare: 0,
                    bidNAV: 0,
                    bidTotal: 0,
                    latestNAV: array[0].latestNAV,
                    latestTime: array[0].latestTime,
                    stockReturn: 0,
                    stockReturnVolatility: 0,
                    offerNAV: 0,
                    offerShare: 0,
                    offerTime: '',
                    redemptionPrice: 0,
                    children: []
                };
                num++;
                for (let item of array) {
                    let bidShare = parent.bidShare + item.bidShare;
                    let bidTotal = parent.bidTotal + (item.bidShare * 100) * (item.bidNAV * 1000);
                    parent.bidShare = bidShare;
                    parent.bidTotal = bidTotal;
                    item.id = num;
                    num++;
                    parent.children.push(item);
                }
                parent.bidNAV = parseFloat((parent.bidTotal / 100000) / parent.bidShare).toFixed(4);
                this.tableData.push(parent);
            });
            console.log(this.tableData);
        }
    }
};
</script>
