<template>
    <div class="wrapper h-100 w-100">
        <v-sidebar :collapse="tempCollapse"></v-sidebar>
        <v-head :collapse="tempCollapse" @collapse="changeCollapse"></v-head>

        <div class="content-box" :class="tempCollapse? 'content-collapse': 'content-uncollapse'">
            <v-tags @change="tagsChange"></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            tempCollapse: false,
            collapseLeft: '200px'
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    methods: {
        changeCollapse(val) {
            this.tempCollapse = val;
        },
        tagsChange(val) {
            this.tagsList = [];
            for (const item of val) {
                this.tagsList.push(item.name);
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.content-box {
    position: absolute;
    top: 50px;
    left: 200px;
    right: 0;
    bottom: 0;
    background-color: #efefef;
}

.content-collapse {
    animation: sidercollapse 0.5s;
    animation-fill-mode:forwards
}
.content-uncollapse {
    animation: sideruncollapse 0.5s;
    animation-fill-mode:forwards
}
@keyframes sidercollapse
{
from {left: 200px;}
to {left: 64px;}
}
@keyframes sideruncollapse
{
from {left: 64px;}
to {left: 200px;}
}

.content {
    position: absolute;
    top: 50px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    overflow: hidden;
}
</style>
