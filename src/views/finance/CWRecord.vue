<template>
    <div class="table-content">
        <div class="search-box">
            <el-form :model="searchForm" size="mini" label-width="80px">
                <el-row>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb-5">
                        <el-form-item label="消费日期">
                            <el-date-picker v-model="searchForm.time" style="width:100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb-5">
                        <el-form-item label="消费项目">
                            <el-select v-model="searchForm.categoryID" style="width:100%" filterable placeholder="请选择">
                                <el-option v-for="item in categoryOption" :key="item.categoryID" :label="item.label" :value="item.categoryID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="8" :lg="12" :xl="16">
                        <el-form-item label-width="0">
                            <el-button type="primary" @click="parameter = { type:'add' }">添加记录</el-button>
                            <el-button @click="clearCondition">清空</el-button>
                            <el-button type="primary" @click="getRecordListByParams">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-box">
            <el-table size="mini" height="100%" :data="tableData" class="w-100" v-loading="loading">
                <el-table-column prop="dissipate" label="消费日期"></el-table-column>
                <el-table-column prop="category.categoryName" label="消费项目">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.category.type === 0?'danger': 'success'">
                            {{scope.row.category.parent.categoryName + '-' + scope.row.category.categoryName}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="金额"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="parameter = {type: 'edit', record: scope.row}" size="mini" type="primary">编辑</el-button>
                        <el-button size="mini" type="danger" @click="deleteConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging-box">
            <el-pagination @size-change="getRecordListByParams" @current-change="getRecordListByParams" layout="total, sizes, prev, pager, next" :page-sizes="[20, 50, 100]"
                :current-page.sync="pagination.pageCurrent" :page-size.sync="pagination.pageSize" :total="pagination.total"></el-pagination>
        </div>
        <CWRecordEdit :parameter="parameter" @confirm="getRecordListByParams"></CWRecordEdit>
    </div>
</template>

<script>
import api from '@/api';
import CWRecordEdit from '@/components/finance/CWRecordEdit.vue';
import { timestampToTemp } from '@/assets/js/common';
import method from '@/method';
export default {
    name: 'cwrecord',
    components: {
        CWRecordEdit
    },
    data() {
        return {
            searchForm: {
                time: [new Date().setDate(1), new Date()],
                categoryID: ''
            },
            tableData: [],
            parameter: {},
            loading: false,
            categoryOption: [],
            pagination: {
                total: 0,
                pageSize: 20,
                pageCurrent: 1

            }
        };
    },
    mounted() {
        method.cw.getAllCategory().then((val) => {
            for (const item of val) {
                if (item.children.length === 0) {
                    continue;
                }
                for (let category of item.children) {
                    category.label = item.categoryName + '-' + category.categoryName;
                    this.categoryOption.push(category);
                }
            }
        });
        this.getRecordListByParams();
    },
    methods: {
        // 初始搜索分页
        searchSubmit() {
            this.pagination = {
                total: 0,
                pageSize: 20,
                pageCurrent: 1

            };
            this.getRecordListByParams();
        },
        // 搜索消费记录
        async getRecordListByParams() {
            const res = await api.cwRecord.getRecordListByParams(this.pagination.pageCurrent, this.pagination.pageSize, this.searchForm.time ? timestampToTemp(this.searchForm.time[0], '%Y-%M-%D 00:00:00') : '',
                this.searchForm.time ? timestampToTemp(this.searchForm.time[1], '%Y-%M-%D 23:59:59') : '', this.searchForm.categoryID);
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
        },
        // 清空搜索条件
        clearCondition() {
            this.searchForm = {
                time: [new Date().setDate(1), new Date()],
                categoryID: ''
            };
            this.searchSubmit();
        },
        // 删除确认
        deleteConfirm(record) {
            this.$confirm('此操作将删除该条记录, 是否继续?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                this.deleteRecord(record.recordID);
            }).catch(() => { });
        },
        // 删除记录
        async deleteRecord(id) {
            this.loading = true;
            const res = await api.cwRecord.deleteRecord(id);
            this.loading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.$message({ type: 'success', message: '删除成功' });
            this.getRecordListByParams();
        }
    }
};
</script>
