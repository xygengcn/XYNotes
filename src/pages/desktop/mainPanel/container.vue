<template>
    <div class="mainPanel-container" :class="{fullScreen:fullScreen}">
        <navbar @fullScreen="fullScreen =!fullScreen;editMode(2);" :mode="mode"></navbar>
        <div class="container" :class="{'md':mode==2}">
            <EditTextarea v-if="mode==1 || mode ==2" class="panel" id="EditTextarea"></EditTextarea>
            <ViewTextarea v-if="mode==0 || mode ==2" class="panel" id="ViewTextarea" @editMode="editMode"></ViewTextarea>
        </div>
    </div>
</template>
<script>
import navbar from "@/components/mainPanel/main/navbar/desktop";
import EditTextarea from "@/components/mainPanel/main/edit/";
import ViewTextarea from "@/components/mainPanel/main/view/";
export default {
    components: {
        navbar,
        EditTextarea,
        ViewTextarea,
    },
    data() {
        return {
            fullScreen: false,
        };
    },
    computed: {
        note() {
            return this.$store.state.note;
        },
        mode() {
            return this.$store.state.noteMode;
        },
    },
    methods: {
        editMode(mode) {
            this.$store.commit("SET_NOTE_MODE", mode);
        },
    },
    mounted() {
        this.$store.commit("ADD_NOTE_READ", this.note.nid);
    },
};
</script>

<style lang="scss" scoped>
.mainPanel-container {
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: column;

    .container {
        flex: 1;
        height: 100%;
        display: flex;
        position: relative;
        margin-bottom: 20px;
        overflow: hidden;

        .panel {
            flex: 1;
            min-width: 50%;
        }
        #EditTextarea {
            padding-left: 50px;
        }
    }
    &.fullScreen {
        position: fixed;
        background: #fff;
        width: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }
}
</style>