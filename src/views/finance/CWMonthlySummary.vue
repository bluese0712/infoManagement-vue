<template>
    <div class="table-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="一月" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="二月" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="三月" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="四月" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="五月" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="六月" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="七月" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="八月" name="fourth">定时任务补偿</el-tab-pane>
            <el-tab-pane label="九月" name="first">用户管理</el-tab-pane>
            <el-tab-pane label="十月" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="十一月" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="十二月" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// import api from '@/api';
// import CWRecordEdit from '@/components/finance/CWRecordEdit.vue';
export default {
    name: 'cwquarterlySummary',
    data() {
        return {
        };
    },
    mounted() {
    },
    methods: {
    }
};
</script>
