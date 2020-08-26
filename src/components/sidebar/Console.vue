<!-- 控制台console面板 -->
<template>
    <div id="console">
        <el-tooltip class="console-tips" effect="dark" content="控制台" placement="top">
            <i class="el-icon-more" @click="isShow =true"></i>
        </el-tooltip>
        <el-drawer :visible.sync="isShow" direction="btt" class="console-body">
            <div class="title" slot="title" contenteditable="false">控制台</div>
            <div class="body">
                <ul>
                    <li v-for="log in logs" :key="log.time" contenteditable="false">
                        <span class="type" :class="{success:log.type=='success',error:log.type=='error'}">[{{log.type}}]</span>
                        <span class="time">[{{$utils.time(log.time)}}]</span>
                        <span class="container">{{log.msg}}</span>
                    </li>
                </ul>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: false,
        };
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
    .console-tips {
        cursor: pointer;
        i {
            width: 36px;
            height: 36px;
            line-height: 36px;
            font-size: 1.5em;
        }
    }
    .console-body {
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
}
</style>