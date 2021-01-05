<template>
    <div class="sidebar">
        <el-scrollbar class="sidebar-box">
            <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="menuCollapse" active-text-color="rgb(64, 158, 255)" router>
                <template v-for="item in menuItems">
                    <template v-if="item.children && item.children.length">
                        <el-submenu :index="item.path" :key="item.path">
                            <template slot="title"><i :class="item.icon"></i><span slot="title">{{ item.title }}</span></template>
                            <template v-for="secondItem in item.children">
                                <el-submenu v-if="secondItem.children && secondItem.children.length" :index="secondItem.url" :key="secondItem.url">
                                    <template slot="title">{{ secondItem.title }}</template>
                                    <el-menu-item v-for="threeItem in secondItem.children" :key="threeItem.url" :index="threeItem.url">{{ threeItem.title }}</el-menu-item>
                                </el-submenu>
                                <el-menu-item v-else :index="secondItem.name" :key="secondItem.url">{{ secondItem.title }}</el-menu-item>
                            </template>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.name" :key="item.url">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
// import { groups } from '../../config';
export default {
    props: {
        collapse: { type: Boolean, default: false }
    },
    watch: {
        collapse(val, oldVal) {
            this.menuCollapse = val;
        },
        $route(newValue, oldValue) {
            if (newValue.meta.hidden) {
                return;
            }
            this.onRoutes = newValue.name;
        }
    },
    data() {
        return {
            onRoutes: '',
            menuCollapse: this.collapse,
            menuItems: [],
            num: 0,
            timer: null
        };
    },
    mounted() {
        this.menuItems = this.getShowRouter(this.$router.options.routes);
    },
    methods: {
        getShowRouter(array) {
            for (let i = 0; i < array.length; i++) {
                if (array[i].hidden) {
                    array.splice(i, 1);
                    i--;
                    continue;
                }
                if (array[i].children.length === 1 && !array[i].children[0].children) {
                    array[i] = array[i].children[0];
                    continue;
                }
            }
            return array;
        }
    }
};
</script>

<style scoped>
.sidebar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-right: 1px solid #ddd;
    z-index: 10;
    background-color: #304156;
}
.sidebar-box {
    height: 100%;
    overflow-y: auto;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}

.sidebar >>> .el-scrollbar__wrap {
    overflow-x: hidden;
}

.sidebar-el-menu {
    border-right: none;
}
.sidebar-el-menu, .sidebar-box >>> .el-menu, .sidebar-box >>> .el-menu-item:focus {
    background-color: rgb(48, 65, 86);
}

.sidebar-box >>> .el-submenu .el-menu-item {
    background-color: #1f2d3d!important;
}
.sidebar-box >>> .el-menu-item:hover, .sidebar-box >>> .el-submenu .el-submenu__title:hover {
    background-color: #001528!important;
}
.sidebar-box >>> .el-menu-item, .sidebar-box >>> .el-submenu__title, .sidebar >>> .el-scrollbar__view {
    color: #FFF;
}
</style>
