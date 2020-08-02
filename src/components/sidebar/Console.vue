<template>
    <el-drawer :visible.sync="isShow" direction="btt" :before-close="close" id="console">
        <div class="title" slot="title">控制台</div>
        <div class="body">
            <ul>
                <li v-for="log in logs" :key="log.time">
                    <span class="type" :class="{success:log.type=='success',error:log.type=='error'}">[{{log.type}}]</span>
                    <span class="time">[{{$utils.time(log.time)}}]</span>
                    <span class="container">{{log.msg}}</span>
                </li>
            </ul>
        </div>
    </el-drawer>
</template>

<script>
export default {
    props: {
        isShow: {
            default: false,
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
    computed: {
        logs() {
            return this.$store.state.logs;
        },
    },
};
</script>

<style lang="scss">
#console {
    text-align: left;
    .el-drawer__header {
        padding: 15px 20px;
        margin-bottom: 0px;
    }
    .el-drawer__body {
        overflow: auto;
        border-top: 1px solid #ececec;
        .body {
            padding: 20px;
            height: 100%;
            ul {
                overflow: auto;
                height: 100%;
                li {
                    margin: 5px 0px;
                    .type {
                        display: inline-block;
                        width: 100px;
                        &.error {
                            color: red;
                        }
                        &.success {
                            color: $theme-color;
                        }
                    }
                    .time {
                        margin-right: 15px;
                    }
                }
            }
        }
    }
}
</style>