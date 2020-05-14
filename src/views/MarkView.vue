<!-- 标记文章列表  -->
<template>
    <div class="MarkBar">
        <div class="title">
            <i class="el-icon-price-tag"></i>标记文章
        </div>
        <div class="NoteList">
            <ul>
                <li class="ListItem" v-for="(item,index) in data" :key="index" @click="setActive(item)">
                    <Note :data="item"></Note>
                </li>
                <li v-if="this.data.length==0" class="blank">文章为空</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Note from "../components/NoteItem";
    export default {
        components: {
            Note
        },
        methods: {
            setActive(item) {
                this.$store.commit("setActive", item);
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
    .MarkBar {
        color: #878787;
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .NoteList {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        padding-bottom: 20px;
    }

    .MarkBar ul {
        list-style: none;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    .MarkBar ul li {
        color: #333;
        cursor: pointer;
    }

    .MarkBar>.title {
        padding: 0px 20px;
        height: 60px;
        border-bottom: 1px solid #d9d9d9;
        line-height: 60px;
    }

    .MarkBar .title i {
        margin-right:10px;
    }
    .blank {
        color: #cccccc !important;
        text-align: center;
        padding: 50px;
    }
</style>