<!-- sidebar组件 -->
<template>
    <div class="sidebar-list">
        <ul v-if="data" :class="'ul-'+direction">
            <li v-for="(item,key) in data" :key="key">
                <router-link :to="item.path">
                    <div class="sideBtn" :class="{active:$route.name==item.name}" @click="defaultAction(item.action);defaultMutation(item.mutation);">
                        <el-badge :value="item.badge" type="warning" contenteditable="false">
                            <i :class="item.icon" aria-hidden="true"></i>
                        </el-badge>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        sidebarClass: {
            type: String,
            default: "",
        },
        data: {
            type: Array,
            default: function () {
                return [];
            },
        },
        direction: {
            type: String,
            default: "column",
        },
    },
    data() {
        return {};
    },
    methods: {
        defaultMutation(mutation) {
            if (mutation) {
                this.$store.commit(mutation);
            }
        },
        defaultAction(action) {
            if (action) {
                this.$store.dispatch(action);
            }
        },
    },
};
</script>

<style lang='scss' scoped>
.sidebar-list {
    flex: 1;
    height: 100%;
    -webkit-app-region: no-drag;
    ul {
        height: 100%;

        &.ul-row {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        &.ul-column {
            display: flex;
            flex-direction: column;

            .sideBtn {
                margin-bottom: 30px;
            }
        }
        .sideBtn {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            background-color: #fff;
            color: $theme-color;
            border: #eee 1px solid;
            text-align: center;
            cursor: pointer;

            position: relative;

            i {
                height: 36px;
                line-height: 36px;
                font-size: 1.3em;
                font-weight: 700;
            }
            &:hover,
            &.active {
                background-color: $theme-color;
                color: #fff;
            }
        }
    }
}
</style>