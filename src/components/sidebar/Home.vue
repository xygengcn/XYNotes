<!-- 左侧菜单 -->
<template>
    <div id="sidebar">
        <router-link to="/" v-if="!isMoibe">
            <div id="logo">
                <img class="img" :src="logo" alt="logo" />
            </div>
        </router-link>
        <div class="toolbar">
            <router-link to="/">
                <div class="sideBtn" @click="addNote">
                    <i class="el-icon-plus" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/">
                <div class="sideBtn" :class="{active:$route.path=='/' || $route.path=='/m/' }">
                    <i class="el-icon-s-order" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/mark">
                <div
                    class="sideBtn"
                    :class="{active:$route.path=='/mark'|| $route.path=='/m/mark'}"
                >
                    <i class="el-icon-star-on" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/plugins">
                <div class="sideBtn" :class="{active:$route.path.indexOf('/plugins') !=-1}">
                    <i class="el-icon-s-grid" aria-hidden="true"></i>
                </div>
            </router-link>
            <router-link to="/setting">
                <div
                    class="sideBtn"
                    :class="{active:$route.path=='/setting' ||$route.path=='/m/setting'}"
                >
                    <i class="el-icon-s-tools" aria-hidden="true"></i>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        logo() {
            return this.$store.state.data.configs.isDark
                ? require("@/assets/logo-dark.png")
                : require("@/assets/logo.png");
        },
        isMoibe() {
            return this.$store.state.isMobie;
        },
    },
    methods: {
        addNote() {
            this.$store.commit("addNote");
        },
    },
};
</script>

<style scoped>
#sidebar {
    width: 73px;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ececec;
    background-color: #f8f8f8;
    -webkit-app-region: drag;
    padding: 15px;
}

#logo {
    width: 36px;
    height: 100px;
    text-align: center;
}

#logo .img {
    height: 36px;
    line-height: 36px;
    font-size: 2em;
}

.sideBtn {
    width: 36px;
    height: 36px;
    margin-bottom: 30px;
    border-radius: 18px;
    background-color: #fff;
    color: #2dbe60;
    border: #eee 1px solid;
    text-align: center;
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.sideBtn i {
    height: 36px;
    line-height: 36px;
    font-size: 1.5em;
}

.sideBtn:hover,
.sideBtn.active {
    background-color: #2dbe60;
    color: #fff;
}
</style>