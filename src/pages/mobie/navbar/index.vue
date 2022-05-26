<!-- 移动端底部导航栏 -->
<template>
    <div id="navbar">
        <sidebar-list :data="menu" :direction="'row'"></sidebar-list>
    </div>
</template>

<script>
import sidebarList from "@/components/sidebar/sidebar-list";
export default {
    components: { sidebarList },
    data() {
        return {
            menu: [
                {
                    path: "/m",
                    name: "mobie",
                    icon: "el-icon-edit-outline",
                    mutation: "ADD_NOTE",
                },
                {
                    path: "/m",
                    name: "mobie-home",
                    icon: "el-icon-s-order",
                },
                {
                    path: "/m/mark",
                    name: "mobie-mark",
                    icon: "el-icon-star-on",
                },
                {
                    path: "/m/plugins",
                    name: "mobie-plugins",
                    icon: "el-icon-s-grid",
                },
                {
                    path: "/m/setting",
                    name: "mobie-setting",
                    icon: "el-icon-s-tools",
                },
            ],
        };
    },
    methods: {
        addNote() {
            console.log(1);
            this.$store.commit("ADD_NOTE");
        },
    },
};
</script>

<style lang='scss' scoped>
#navbar {
    height: 73px;
    padding: 20px 15px 15px;
    border-radius: 25% 25% 0 0;
    background-color: #f8f8f8;
    position: relative;
    &:after {
        content: " ";
        z-index: -2;
        height: 100%;
        width: 100%;
        position: absolute;
        top: -1px;
        left: 0;
        border-radius: 25% 25% 0 0;
        box-shadow: 0 -3px 4px 0 #e1e1e1;
    }
}
</style>