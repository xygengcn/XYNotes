<template>
    <el-dropdown trigger="click" @command="order">
        <span class="el-dropdown-link">
            <small>
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
    data() {
        var sorts = [
            {
                key: "updated",
                order: "asc",
                value: "更新时间（最早优先）",
            },
            {
                key: "updated",
                order: "desc",
                value: "更新时间（最晚优先）",
            },
        ];

        return {
            sorts: sorts,
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
            this.$store.commit("setOrder", sortkey);
            this.$store.commit("setNotes");
            this.$store.dispatch("SAVE_DATA_ITEM", "configs");
        },
    },
};
</script>

<style>
</style>