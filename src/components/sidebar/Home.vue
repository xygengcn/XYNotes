<!-- 左侧菜单 -->
<template>
    <div id="sidebar">
        <router-link to="/" v-if="!isMoibe">
            <div id="logo">
                <img class="img" src="@/assets/logo.png" alt="logo" />
            </div>
        </router-link>
        <div class="toolbar">
            <router-link to="/">
                <div class="sideBtn" @click="addNote">
                    <i class="el-icon-edit-outline" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/">
                <div class="sideBtn" :class="{active:$route.path=='/' || $route.path=='/m/' || $route.path=='/note'}">
                    <i class="el-icon-s-order" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/mark">
                <div class="sideBtn" :class="{active:$route.path=='/mark'|| $route.path=='/m/mark'}">
                    <i class="el-icon-star-on" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/plugins">
                <div class="sideBtn" :class="{active:$route.path.indexOf('/plugins') !=-1}">
                    <i class="el-icon-s-grid" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/setting">
                <div class="sideBtn" :class="{active:$route.path=='/setting' ||$route.path=='/m/setting'}">
                    <i class="el-icon-s-tools" aria-hidden="true"></i>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        isMoibe() {
            return this.$store.state.isMobie;
        },
    },
    methods: {
        addNote() {
            this.$store.commit("ADD_NOTE");
        },
    },
};
</script>

<style lang="scss" scoped>
#sidebar {
    width: 73px;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ececec;
    background-color: #f8f8f8;
    -webkit-app-region: drag;
    padding: 15px;

    #logo {
        width: 36px;
        height: 100px;
        text-align: center;
        .img {
            height: 36px;
            line-height: 36px;
            font-size: 2em;
        }
    }

    .sideBtn {
        width: 36px;
        height: 36px;
        margin-bottom: 30px;
        border-radius: 18px;
        background-color: #fff;
        color: $theme-color;
        border: #eee 1px solid;
        text-align: center;
        cursor: pointer;
        -webkit-app-region: no-drag;

        i {
            height: 36px;
            line-height: 36px;
            font-size: 1.5em;
        }

        &:hover,
        &.active {
            background-color: $theme-color;
            color: #fff;
        }
    }
}
</style>