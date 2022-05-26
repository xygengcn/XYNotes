<!-- 编辑器头部 -->
<template>
    <div class="mobie-note-header">
        <div class="left">
            <router-link to="/m"><i class="el-icon-close"></i></router-link>
        </div>
        <div class="right" v-if="mode==0" @click="setMode(1)"><i class="el-icon-edit"></i></div>
        <div class="right" v-if="mode==1" @click="setMode(0)"><i class="el-icon-view"></i></div>
    </div>
</template>

<script>
export default {
    components: {},
    computed: {
        mode() {
            return this.$store.state.noteMode;
        },
    },
    methods: {
        setMode(mode) {
            this.$store.commit("SET_NOTE_MODE", mode);
        },
    },
};
</script>

<style lang='scss' scoped>
.mobie-note-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: $border-default;
    color: #333;

    a {
        color: #333;
    }
}
</style>