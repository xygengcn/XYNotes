<!-- 移动端编辑页 -->
<template>
    <div class="mobie-note-container">
        <note-header></note-header>
        <div class="container">
            <viewPanel v-if="mode==0"></viewPanel>
            <editPanel v-if="mode==1"></editPanel>
        </div>
        <toolbar></toolbar>
    </div>
</template>
<script>
import noteHeader from "@/pages/mobie/note/container/header";
import editPanel from "@/components/mainPanel/main/edit";
import viewPanel from "@/components/mainPanel/main/view/";
import toolbar from "@/pages/mobie/note/container/toolbar";
export default {
    components: { toolbar, noteHeader, editPanel, viewPanel },
    computed: {
        mode() {
            return this.$store.state.noteMode;
        },
    },
    mounted() {
        this.$store.commit("ADD_NOTE_READ", this.$store.state.note.nid);
    },
};
</script>

<style lang='scss' scoped>
.mobie-note-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .container {
        flex: 1;
        overflow: hidden;
    }
}
</style>