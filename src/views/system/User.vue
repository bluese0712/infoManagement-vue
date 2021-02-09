<template>
    <div class="table-content">
        <div class="search-box">
            <el-form :model="searchForm" size="mini" label-width="60px">
                <el-row>
                    <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
                        <el-form-item label="用户名"><el-input v-model="searchForm.userName"></el-input></el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="4">
                        <el-form-item label="昵称"><el-input v-model="searchForm.nickName"></el-input></el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="16">
                        <el-form-item>
                            <el-button type="success" @click="parameter = { type:'add' }">添加角色</el-button>
                            <el-button @click="clearSearch">清空</el-button>
                            <el-button type="primary" @click="seachSubmit">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="table-box">
            <el-table border size="mini" height="100%" :data="tableData" class="w-100" v-loading="loading">
                <el-table-column prop="userName" label="用户名"></el-table-column>
                <el-table-column prop="nickName" label="昵称"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="deleteConfirm(scope.row)">删除</el-button>
                        <!-- <el-button type="primary" size="mini" @click="editUser(scope.row)">编辑</el-button> -->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging-box">
            <el-pagination layout="total, sizes, prev, pager, next" :total="pagination.total" :page-sizes="[20, 30, 50]" background
            @size-change="getCategoryListByParams" @current-change="getCategoryListByParams" :page-size="pagination.pageSize" :current-page="pagination.pageNum"></el-pagination>
        </div>
        <UserCreate :parameter="parameter" @confirm="getCategoryListByParams"></UserCreate>
    </div>
</template>

<script>
import api from '@/api';
import UserCreate from '@/components/system/UserCreate.vue';
export default {
    name: 'cwrecord',
    components: {
        UserCreate
    },
    data() {
        return {
            loading: false,
            searchForm: { userName: '', nickName: '' },
            pagination: { total: 0, pageSize: 20, pageNum: 1 },
            tableData: [],
            parameter: {}
        };
    },
    mounted() {
        this.getCategoryListByParams();
    },
    methods: {
        // 搜索按钮事件
        seachSubmit() {
            this.pagination.total = 0;
            this.pagination.pageNum = 1;
            this.getCategoryListByParams();
        },
        // 查询
        async getCategoryListByParams() {
            this.loading = true;
            const res = await api.user.getUserListByParams(this.pagination.pageNum, this.pagination.pageSize, this.searchForm.userName, this.searchForm.nickName);
            this.loading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.pagination.total = res.data.total;
            this.tableData = res.data.data;
        },
        // 清空搜索条件
        clearSearch() {
            this.searchForm = { userName: '', nickName: '' };
            this.seachSubmit();
        },
        deleteConfirm(user) {
            this.$confirm('确认删除该用户?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                this.deleteUser(user.userID);
            }).catch(() => { });
        },
        async deleteUser(userID) {
            this.loading = true;
            const res = await api.user.deleteUser(userID);
            this.loading = false;
            if (res.code !== 200) {
                this.$message({ type: 'error', message: res.msg });
                return;
            }
            this.getCategoryListByParams();
        }
    }
};
</script>
