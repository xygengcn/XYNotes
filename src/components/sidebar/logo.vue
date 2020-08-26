<!-- sidebar-logo -->
<template>
    <div class="sidebar-logo">
        <router-link to="/">
            <div class="sidebar-logo_logo">
                <img class="img" src="@/assets/img/logo.png" alt="logo" />
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {};
    },
};
</script>

<style lang='scss' scoped>
.sidebar-logo_logo {
    width: 100%;
    height: 100%;
    text-align: center;
    .img {
        height: 36px;
        line-height: 36px;
        font-size: 2em;
    }
}
</style>