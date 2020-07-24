<!-- 首页 -->
<template>
    <div
        class="wrap"
        v-loading="loading.status"
        :element-loading-text="loading.text"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <sidebar></sidebar>
        <transition tag="div" appear>
            <mainbar v-if="isTriggle"></mainbar>
        </transition>
        <mainWap @Triggle="Triggle" v-if="!isMobie"></mainWap>
    </div>
</template>
<script>
import sidebar from "@/components/sidebar/Home";
import mainbar from "@/components/mainbar/Home";
import mainWap from "@/components/main/Home";
import { Loading } from "element-ui";
export default {
    components: {
        sidebar,
        mainbar,
        mainWap,
    },
    data() {
        return {
            isTriggle: true,
            isLoading: false,
        };
    },
    computed: {
        isMobie() {
            return this.$store.state.isMobie;
        },
        loading() {
            return this.$store.state.loading;
        },
    },
    methods: {
        Triggle(is) {
            this.isTriggle = is;
        },
    },
    beforeCreate() {
        this.$store.dispatch("init");
        this.$plugins.hook("start");
    },
};
</script>
<style scoped>
.wrap {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
}

.v-enter,
.v-leave-to {
    opacity: 0;
    transform: translateX(-300px);
}

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-move {
    transition: all 0.5s ease;
}

.v-leave-active {
    position: absolute;
}
</style>