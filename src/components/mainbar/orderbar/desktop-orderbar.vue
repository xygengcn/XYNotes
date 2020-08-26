<template>
    <el-dropdown trigger="click" @command="order">
        <span class="el-dropdown-link">
            <small class="order-title">
                {{sortkey.value}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </small>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in sorts" :icon="isSort(item)?'el-icon-check':'el-icon-minus'" :command="item" :key="index">{{item["value"]}}</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    props: ["sorts"],
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
        },
    },
};
</script>

<style>
</style>