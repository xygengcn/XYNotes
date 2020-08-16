<!-- 显示面板 -->
<template>
    <div id="mainHome">
        <welcome v-if="!note"></welcome>
        <container v-else-if="note && (!note.password || isRead)"></container>
        <lock v-else :note="note"></lock>
    </div>
</template>
<script>
import welcome from "@/components/main/welcome/Home";
import lock from "@/components/main/lock/Home";
import container from "@/components/main/main/Home";
export default {
    components: {
        container,
        lock,
        welcome,
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