<!-- 编辑器功能菜单 -->
<template>
    <div class="mobie-note-navbar">
        <toobar></toobar>
    </div>
</template>

<script>
import toobar from "@/components/mainPanel/main/navbar/mobie";
export default {
    components: { toobar },
    data() {
        return {};
    },
};
</script>

<style lang='scss' scoped>
.mobie-note-navbar {
    border-top: $border-default;
    padding: 10px 0px;
}
</style>