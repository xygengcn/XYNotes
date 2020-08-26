<!-- 桌面端主架构 -->
<template>
    <div id="desktop" class="desktop">
        <sidebar class="sidebar"></sidebar>
        <mainbar class="mainbar"></mainbar>
        <mainPanel class="mainPanel"></mainPanel>
    </div>
</template>

<script>
import sidebar from "@/pages/desktop/sidebar";
import mainbar from "@/pages/desktop/mainbar";
import mainPanel from "@/pages/desktop/mainPanel";
export default {
    components: { mainPanel, mainbar, sidebar },
    data() {
        return {};
    },
};
</script>

<style lang='scss' scoped>
.desktop {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;

    .sidebar {
        width: 73px;
        height: 100%;
        position: relative;
        box-sizing: border-box;
        border-right: 1px solid #ececec;
        overflow: hidden;
    }
    .mainbar {
        width: 300px;
        height: 100%;
        border-right: 1px solid #ececec;
        overflow: hidden;
    }
    .mainPanel {
        flex: 1;
        overflow: hidden;
    }
}
</style>