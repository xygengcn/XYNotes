<!-- 主面板 -->
<template>
    <div id="mainPanel">
        <container v-if="note && (!note.password || isRead)"></container>
        <lock v-else :note="note"></lock>
    </div>
</template>
<script>
import lock from "@/components/mainPanel/lock";
import container from "@/pages/desktop/mainPanel/container";
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
            let lock = this.$store.state.notesRead.find((item) => {
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