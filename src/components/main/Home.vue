<!-- 显示面板 -->
<template>
    <div id="mainHome">
        <container v-if="!note.password || isRead"></container>
        <lock v-else :note="note"></lock>
    </div>
</template>
<script>
import lock from "@/components/main/Lock";
import container from "@/components/main/Main";
export default {
    components: {
        container,
        lock,
    },
    computed: {
        note() {
            return this.$store.state.note;
        },
        isRead() {
            let lock = this.$store.state.history.find((item) => {
                return item == this.note.nid;
            });
            return lock ? true : false;
        },
    },
};
</script>
<style scoped>
#mainHome {
    flex: 1;
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: column;
}
</style>