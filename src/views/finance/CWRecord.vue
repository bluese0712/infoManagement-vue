<template>
    <div class="table-content">
        <div class="search-box">
            <el-form :model="formInline" size="mini" label-width="80px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button type="primary" @click="parameter = { type:'add' }">添加记录</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-box">
            <el-table size="mini" height="100%" :data="tableData" class="w-100">
                <el-table-column prop="dissipate" label="消费日期"></el-table-column>
                <el-table-column prop="category.categoryName" label="消费项目"></el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
            </el-table>
        </div>
        <div class="paging-box">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
        <CWRecordEdit :parameter="parameter"></CWRecordEdit>
    </div>
</template>

<script>
import api from '@/api';
import CWRecordEdit from '@/components/finance/CWRecordEdit.vue';
export default {
    name: 'cwrecord',
    components: {
        CWRecordEdit
    },
    data() {
        return {
            formInline: {},
            tableData: [],
            parameter: {}
        };
    },
    mounted() {
        this.getRecordListByParams();
    },
    methods: {
        async getRecordListByParams() {
            const res = await api.cwRecord.getRecordListByParams();
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
