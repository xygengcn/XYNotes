<!-- 排序 -->
<template>
    <div id="order">
        <mobie v-if="isMobie" :sorts="sorts"></mobie>
        <desktop v-else :sorts="sorts"></desktop>
    </div>
</template>

<script>
import mobie from "@/components/mainbar/orderbar/mobie-orderbar";
import desktop from "@/components/mainbar/orderbar/desktop-orderbar";
export default {
    components: { desktop, mobie },
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
        isMobie() {
            return this.$store.state.isMobie;
        },
    },
};
</script>

<style lang='scss'>
#order {
    cursor: pointer;
    .order-title {
        color: #878787;
    }
}
</style>