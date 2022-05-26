<!-- 中间栏模板 -->
<template>
    <div class="mainbar-page">
        <div class="mainbar-page-header">
            <div class="left">
                <i :class="icon"></i><span>{{ title }}</span>
            </div>
            <div class="right">
                <slot name="header-right"></slot>
            </div>
        </div>
        <div class="mainbar-page-container">
            <div class="mainbar-page-container-body">
                <slot name="body"></slot>
            </div>
        </div>
        <div class="mainbar-page-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["title", "icon"],
};
</script>
<style lang="scss" scoped>
.mainbar-page {
    color: #878787;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;

    .mainbar-page-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px 20px;
        height: 60px;
        line-height: 60px;
        color: #878787;
        box-sizing: border-box;
        border-bottom: $border-default;
        .left i {
            margin-right: 10px;
            color: #878787;
        }

        .right i {
            cursor: pointer;
            font-size: 18px;
        }
    }
    .mainbar-page-container {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 50px;
        position: relative;
        .mainbar-page-container-body {
            height: 100%;
            overflow: auto;
        }
    }
    .main-page-footer {
        height: 50px;
    }
}
</style>