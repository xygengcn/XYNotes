<!-- 中间栏模板 -->
<template>
    <div class="main-wrap">
        <div class="header">
            <div class="left">
                <i :class="icon"></i><span>{{ title }}</span>
            </div>
            <div class="right">
                <slot name="header-right"></slot>
            </div>
        </div>
        <div class="main-wrap-container">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["title", "icon"],
};
</script>
<style lang="scss" scoped>
.main-wrap {
    color: #878787;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 0px 20px;
        height: 60px;
        line-height: 60px;
        color: #878787;
        box-sizing: border-box;
        border-bottom: 1px solid #d9d9d9;
        .left i {
            margin-right: 10px;
            color: #878787;
        }

        .right i {
            cursor: pointer;
            font-size: 18px;
        }
    }
    .main-wrap-container {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        padding-bottom: 60px;
        position: relative;
    }
}
</style>