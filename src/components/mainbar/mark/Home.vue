<!-- 标记文章列表  -->
<template>
    <page :title="'标记文章'" :icon="'el-icon-price-tag'">
        <ul slot="body">
            <li class="ListItem" v-for="(item, index) in data" :key="index" @click="setActive(item)">
                <Note :data="item"></Note>
            </li>
            <li v-if="data.length == 0" class="blank">文章为空</li>
        </ul>
    </page>
</template>
<script>
import page from "@/components/mainbar/common/Page";
import Note from "@/components/mainbar/common/Note";
export default {
    components: {
        Note,
        page,
    },
    methods: {
        setActive(item) {
            this.$store.commit("SET_NOTE_ACTIVE", item);
            if (this.$store.state.isMobie) {
                this.$router.push("/m/note");
            }
        },
    },
    computed: {
        data() {
            return this.$store.state.data.notes.filter((item) => item.mark);
        },
    },
};
</script>
<style scoped>
</style>