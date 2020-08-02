<!-- 左侧菜单 -->
<template>
    <div id="sidebar">
        <div class="logo" v-if="!isMobie">
            <router-link to="/">
                <div id="logo">
                    <img class="img" src="@/assets/img/logo.png" alt="logo" />
                </div>
            </router-link>
        </div>

        <div class="toolbar">
            <router-link to="/">
                <div class="sideBtn center" @click="addNote">
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
        <div class="footer" v-if="!isMobie">
            <div class="loading" v-if="loadingTips.status">
                <el-tooltip class="item" effect="dark" :content="loadingTips.text" placement="top">
                    <i class="el-icon-loading"></i>
                </el-tooltip>
            </div>
            <div class="console">
                <el-tooltip class="item" effect="dark" content="控制台" placement="top">
                    <i class="el-icon-more" @click="isShow =true"></i>
                </el-tooltip>
                <console :isShow="isShow" @close="isShow =false"></console>
            </div>
        </div>
    </div>
</template>
<script>
import console from "./Console";
export default {
    components: {
        console,
    },
    data() {
        return {
            isShow: false,
        };
    },
    computed: {
        isMobie() {
            return this.$store.state.isMobie;
        },
        loadingTips() {
            return this.$store.state.loadingTips;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 73px;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ececec;
    background-color: #f8f8f8;
    -webkit-app-region: drag;
    padding: 15px;

    .logo {
        width: 36px;
        height: 100px;
        text-align: center;
        .img {
            height: 36px;
            line-height: 36px;
            font-size: 2em;
        }
    }
    .toolbar {
        flex: 1;
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
            position: relative;

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

    .footer {
        text-align: center;
        .loading {
            margin-bottom: 20px;
            cursor: pointer;
            i {
                width: 36px;
                height: 36px;
                line-height: 36px;
                font-size: 2em;
            }
        }
        .console {
            cursor: pointer;
            i {
                width: 36px;
                height: 36px;
                line-height: 36px;
                font-size: 1.5em;
            }
        }
    }
}
</style>