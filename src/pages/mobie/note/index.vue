<!-- 详细页 -->
<template>
    <div id="mobie-note" class="mainPanel">
        <container v-if="note && (!note.password || isRead)"></container>
        <lock v-else :note="note"></lock>
    </div>
</template>

<script>
import lock from "@/components/mainPanel/lock";
import container from "@/pages/mobie/note/container";
export default {
    components: { container, lock },
    data() {
        return {};
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
    beforeMount() {
        if (!this.note) {
            this.$router.push("/m");
        }
    },
};
</script>

<style lang='scss' scoped>
#mobie-note {
    height: 100%;
}
</style>