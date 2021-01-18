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
                <el-table-column prop="dissipate" label="基金名"></el-table-column>
                <el-table-column prop="dissipate" label="基金代码"></el-table-column>
                <el-table-column prop="category.categoryName" label="买入日期"></el-table-column>
                <el-table-column prop="amount" label="购买份额"></el-table-column>
                <el-table-column prop="amount" label="购买净值"></el-table-column>
                <el-table-column prop="amount" label="最新净值"></el-table-column>
                <el-table-column prop="amount" label="更新日期"></el-table-column>
                <el-table-column prop="amount" label="持有收益"></el-table-column>
                <el-table-column prop="amount" label="持有收益率"></el-table-column>
            </el-table>
        </div>
        <div class="paging-box">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
        <CWFundEdit :parameter="parameter"></CWFundEdit>
    </div>
</template>

<script>
import api from '@/api';
import CWFundEdit from '@/components/finance/CWFundEdit.vue';
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
            const res = await api.cwFund.updateFund();
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.tableData = res.data.data;
            let num = 0;
            for (const item of res.data.data) {
                num += item.amount * 100;
            }
            console.log(num / 100);
        }
    }
};
</script>
