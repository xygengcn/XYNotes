<!-- 移动端架构 -->
<template>
    <div id="mobie" class="mobie">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
};
</script>

<style lang='scss'>
#mobie {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.el-message-box,
.el-dialog {
    width: 80% !important;
}
</style>