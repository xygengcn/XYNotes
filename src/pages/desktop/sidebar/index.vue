<!-- 桌面左侧栏 -->
<template>
    <div id="sidebar">
        <logo class="logo"></logo>
        <sidebar-list class="sidebar-list" :data="menu"></sidebar-list>
        <console-panel class="console"></console-panel>
    </div>
</template>

<script>
import logo from "@/components/sidebar/logo";
import sidebarList from "@/components/sidebar/sidebar-list";
import consolePanel from "@/components/sidebar/panel";
export default {
    components: { sidebarList, logo,consolePanel },
    data() {
        return {
            menu: [
                {
                    path: "/",
                    name: "desktop",
                    icon: "el-icon-edit-outline",
                    mutation: "ADD_NOTE",
                },
                {
                    path: "/",
                    name: "desktop-home",
                    icon: "el-icon-s-order",
                },
                {
                    path: "/mark",
                    name: "desktop-mark",
                    icon: "el-icon-star-on",
                },
                {
                    path: "/plugins",
                    name: "desktop-plugins",
                    icon: "el-icon-s-grid",
                },
                {
                    path: "/setting",
                    name: "desktop-setting",
                    icon: "el-icon-s-tools",
                },
            ],
        };
    },
};
</script>

<style lang='scss' scoped>
#sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    border-right: 1px solid #ececec;
    background-color: #f8f8f8;
    -webkit-app-region: drag;
    padding: 15px;
    .logo {
        margin-bottom: 80px;
    }
    .console {
        margin: 10px 0px;
        cursor: pointer;
    }
}
</style>