<template>
    <div class="table-content">
        <div class="table-box">
            <div class="d-flex">
                <div>
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="flex-1">
                    <el-tabs v-model="activeName" class="mx-10" :stretch="true" @tab-click="monthSelect">
                        <el-tab-pane label="一月" name="January"></el-tab-pane>
                        <el-tab-pane label="二月" name="February"></el-tab-pane>
                        <el-tab-pane label="三月" name="March"></el-tab-pane>
                        <el-tab-pane label="四月" name="April"></el-tab-pane>
                        <el-tab-pane label="五月" name="May"></el-tab-pane>
                        <el-tab-pane label="六月" name="June"></el-tab-pane>
                        <el-tab-pane label="七月" name="July"></el-tab-pane>
                        <el-tab-pane label="八月" name="August"></el-tab-pane>
                        <el-tab-pane label="九月" name="September"></el-tab-pane>
                        <el-tab-pane label="十月" name="October"></el-tab-pane>
                        <el-tab-pane label="十一月" name="November"></el-tab-pane>
                        <el-tab-pane label="十二月" name="December"></el-tab-pane>
                    </el-tabs>
                </div>
            </div>

            <!-- <div>
                <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
            </div> -->
            <div>
            </div>
        </div>

    </div>
</template>

<script>
// import api from '@/api';
// import CWRecordEdit from '@/components/finance/CWRecordEdit.vue';
export default {
    name: 'cwquarterlySummary',
    data() {
        return {
            activeName: ''
        };
    },
    mounted() {
    },
    methods: {
        monthSelect(val) {
            console.log(this.activeName);
        }
    }
};
</script>
<style lang="scss" scoped>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
