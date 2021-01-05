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
                <el-table-column prop="recordingTime" label="记录时间"></el-table-column>
                <el-table-column prop="weight" label="体重"></el-table-column>
                <el-table-column prop="chest" label="胸围"></el-table-column>
                <el-table-column prop="waist" label="腰围"></el-table-column>
                <el-table-column prop="hipline" label="臀围"></el-table-column>
                <el-table-column prop="leftThigh" label="左大腿围"></el-table-column>
                <el-table-column prop="rightThigh" label="右大腿围"></el-table-column>
                <el-table-column prop="leftCalf" label="左小腿围"></el-table-column>
                <el-table-column prop="rightCalf" label="右小腿围"></el-table-column>
                <el-table-column prop="leftBicep" label="左大臂围"></el-table-column>
                <el-table-column prop="rightBicep" label="右大臂围"></el-table-column>
            </el-table>
        </div>
        <div class="paging-box">
            <el-pagination layout="prev, pager, next" :total="50"></el-pagination>
        </div>
        <JSRecordEdit :parameter="parameter"></JSRecordEdit>
    </div>
</template>

<script>
import JSRecordEdit from '@/components/bodybuilding/JSRecordEdit.vue';
export default {
    name: 'cwrecord',
    components: {
        JSRecordEdit
    },
    data() {
        return {
            formInline: {},
            tableData: [],
            parameter: {}
        };
    },
    methods: {
    }
};
</script>
