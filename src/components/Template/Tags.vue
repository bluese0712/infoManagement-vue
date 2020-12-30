<template>
    <div class="tags">
        <div class="tags-list">
            <el-tabs v-model="tabsVal" type="card" closable @tab-remove="removeTab" @tab-click="tabClick" >
                <el-tab-pane
                    v-for="item in tagsList"
                    :key="item.name"
                    :label="item.title"
                    :name="item.name"
                >
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tagsList: [],
            tabsVal: ''
        };
    },
    methods: {
        // 关闭全部标签
        closeAll() {
            this.tagsList = [];
            this.$router.push('/');
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            });
            this.tagsList = curItem;
        },
        // 设置标签
        setTags(route) {
            const isExist = this.tagsList.some(item => {
                return item.name === route.name;
            });
            if (!isExist) {
                this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.name
                });
                this.tabsVal = route.name;
                this.$emit('change', this.tagsList);
            } else {
                this.tabsVal = route.name;
            }
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        },
        // 标签删除
        removeTab(targetName) {
            let tabs = this.tagsList;
            let activeName = this.tabsVal;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                            this.$router.push({ name: activeName });
                        }
                    }
                });
            }
            this.tabsVal = activeName;
            this.tagsList = tabs.filter(tab => tab.name !== targetName);
            if (this.tagsList.length === 0) {
                this.$router.push('/index');
            }
            this.$emit('change', this.tagsList);
        },
        // 标签点击
        tabClick(val) {
            if (this.$route.name === this.tabsVal) {
                return;
            }
            this.$router.push({ name: this.tabsVal });
        }
    },
    watch: {
        $route(newValue, oldValue) {
            // if (newValue.meta && newValue.meta.hidden) {
            //     return;
            // }
            this.setTags(newValue);
        }
    },
    created() {
        this.setTags(this.$route);
    }
};

</script>

<style>
.tags {
    position: relative;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    padding-left: 10px;
    box-shadow: 0 5px 10px #ddd;
}
.tags-list {
    margin: 5px 0;
}
.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 5px;
    /* height: 41px;
    line-height: 36px; */
    box-sizing: border-box;
    text-align: center;
    width: 110px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
    z-index: 10;
}
.el-tabs__header {
    margin: 0;
}
.el-tabs--card>.el-tabs__header {
    border: none
}
.el-tabs--card>.el-tabs__header .el-tabs__item {
    border: none;
    padding: 0 13px;
    height: 32px;
    line-height: 30px;
    border-radius: 4px;
    border: 1px solid #d9ecff;
    font-size: 12px;
    color: #409eff;
    box-sizing: border-box;
    white-space: nowrap;
    margin-left: 10px;
}
.el-tabs--card>.el-tabs__header .el-tabs__nav {
    border: none;
}
.el-tabs__nav-next, .el-tabs__nav-prev {
    line-height: 32px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable {
    padding: 0 13px;
}
.el-tabs--bottom .el-tabs--left>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--bottom .el-tabs--right>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--left>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--right>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:nth-child(2) {
    padding-left: 13px;
}
.el-tabs--bottom .el-tabs--left>.el-tabs__header .el-tabs__item:last-child, .el-tabs--bottom .el-tabs--right>.el-tabs__header .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--card>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top .el-tabs--left>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top .el-tabs--right>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top.el-tabs--border-card>.el-tabs__header .el-tabs__item:last-child, .el-tabs--top.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
    padding-right: 13px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable .el-icon-close, .el-tabs--card>.el-tabs__header .el-tabs__item.is-closable .el-icon-close {
    width: 14px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item .el-icon-close {
    font-size: 14px;
    line-height: 14px;
    top: -2px;
}
.el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
    border-left: 1px solid #d9ecff;
    margin: 0;
}
.el-tabs__item .el-icon-close:hover {
    background-color: #fff;
    color: #409eff;
}
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    border-bottom-color: #d9ecff;
    background-color: #409eff;
    color: #ecf5ff;
}
</style>
