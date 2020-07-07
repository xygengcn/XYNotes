<!-- 标记文章列表  -->
<template>
    <page-view :title="'标记文章'" :icon="'el-icon-price-tag'">
        <ul>
            <li class="ListItem" v-for="(item,index) in data" :key="index" @click="setActive(item)">
                <Note :data="item"></Note>
            </li>
            <li v-if="data.length==0" class="blank">文章为空</li>
        </ul>
    </page-view>
</template>
<script>
    import PageView from "../components/PageView";
    import Note from "../components/NoteItem";
    export default {
        components: {
            Note,
            PageView
        },
        methods: {
            setActive(item) {
                this.$store.commit("setActive", item);
                if (this.$store.state.isMobie) {
                    this.$router.push('/m/note');
                }
            }
        },
        computed: {
            data() {
                return this.$store.state.data.notes.filter(item => item.mark);
            }
        }
    }
</script>
<style scoped>
</style>