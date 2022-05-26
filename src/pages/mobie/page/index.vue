<!-- 移动端功能页 -->
<template>
    <div id="mobie-page" class="mainbar">
        <div class="container">
            <router-view></router-view>
        </div>
        <navbar class="navbar"></navbar>
    </div>
</template>

<script>
import navbar from "@/pages/mobie/navbar";
export default {
    components: { navbar },
    data() {
        return {};
    },
};
</script>

<style lang='scss'>
#mobie-page {
    height: 100%;
    .container {
        height: calc(100% - 73px) !important;
    }
    .item {
        box-shadow: $box-shadow;
        margin: 10px;
        border-radius: 4px;

        &,
        &:hover,
        &.itemActive {
            border-color: transparent !important;
        }
    }
}
</style>