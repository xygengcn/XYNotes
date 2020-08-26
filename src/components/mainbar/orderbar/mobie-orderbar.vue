<!-- 移动端排序弹出 -->
<template>
    <div id="mobie-orderbar">
        <small class="order-title" @click="drawer=true">
            {{sortkey.value}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </small>
        <el-drawer :visible.sync="drawer" direction="btt" :show-close="false" :with-header="false" size="auto">
            <ul class="sort-list">
                <li v-for="(item,index) in sorts" @click="order(item)" :key="index">{{item["value"]}}<i :class="isSort(item)?'el-icon-check':'el-icon-minus'"></i></li>
            </ul>
        </el-drawer>
    </div>
</template>

<script>
export default {
    props: ["sorts"],
    data() {
        return {
            drawer: false,
        };
    },
    computed: {
        notes() {
            return this.$store.state.data.notes;
        },
        sortkey() {
            return this.$store.state.data.configs.sortKey;
        },
    },
    methods: {
        isSort(order) {
            return (
                order.key == this.sortkey.key &&
                order.order == this.sortkey.order
            );
        },
        //排序记录
        order(sortkey) {
            this.$store.commit("SET_ORDER", sortkey);
            this.$store.commit("SET_NOTE_ALL");
            this.$store.dispatch("SAVE_DATA_ITEM", "configs");
            this.drawer = false;
        },
    },
};
</script>

<style lang='scss'>
#mobie-orderbar {
    .sort-list {
        padding: 20px 0px;
        li {
            text-align: center;
            padding: 10px 0px;
            i {
                margin: 0px 10px;
            }
        }
    }
}
</style>