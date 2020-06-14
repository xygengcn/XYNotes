<!--  本地备份区 -->
<template>
    <div class="backupBar">
        <div class="title">
            <i class="el-icon-coin"></i>备份与恢复
        </div>
        <div class="container">
            <div class="panel">
                <div class="title">
                    <i class="el-icon-upload2"></i>本地恢复
                </div>
                <div class="contain">
                    <input type="file" accept=".xy" @change="inputFile($event)" id="localUp" />
                    <i class="el-icon-upload2"></i>
                </div>
            </div>
            <div class="panel">
                <div class="title">
                    <i class="el-icon-download"></i>本地备份
                </div>
                <div class="contain">
                    <i class="el-icon-download" @click="localDownDialog=true"></i>
                </div>
            </div>
        </div>
        <el-dialog title="本地备份" :visible.sync="localDownDialog" width="30%" center>
            <span class="dialog">xy笔记.xy</span>
            <span slot="footer" class="dialog-footer">
                <a :href="localDownUrl" download="xy笔记.xy">
                    <el-button @click="localDownDialog = false" plain>开始下载</el-button>
                </a>
                <el-button @click="localDownDialog = false" plain>取消下载</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                file: [],
                localDownDialog: false,
                localDownUrl: ""
            }
        },
        methods: {
            //读取
            localUp: function () {
                const reader = new FileReader();
                reader.readAsText(this.file);
                const _this = this;
                reader.onload = function () {
                    _this.data = JSON.parse(decodeURIComponent(escape(window.atob(this.result))));
                    _this.$store.commit("setData", _this.data);
                };
            },
            //导入文件
            inputFile(event) {
                this.file = event.target.files[0];
                this.localUp();
            }
        },
        watch: {
            localDownDialog(value) {
                if (value) {
                    var data = JSON.stringify(this.$store.state.data);
                    data = window.btoa(unescape(encodeURIComponent(data)));
                    this.localDownUrl = this.$utils.dataToUrl(data);
                }
            }
        }
    }
</script>
<style scoped>
    .backupBar {
        color: #878787;
    }

    .backupBar .title i {
        margin-right: 10px;
    }

    .backupBar>.title {
        padding: 0px 20px;
        height: 60px;
        border-bottom: 1px solid #d9d9d9;
        line-height: 60px;
    }
    .backupBar .container{
        overflow: auto;
    }

    .backupBar .panel {
        padding: 10px 24px;
    }

    .panel .title {
        padding: 10px 0px;
        border-bottom: 1px solid #eeeeee;
    }

    .panel .contain {
        margin: 20px auto;
        height: 100px;
        text-align: center;
        line-height: 60px;
        position: relative;
    }

    .panel .contain i {
        font-size: 4em;
        cursor: pointer;
        background: #f9f9f9;
        padding: 20px;
        border-radius: 50%;
    }

    #localUp {
        width: 100%;
        height: 100%;
        opacity: 0;
        background: #cccccc;
        position: absolute;
        left: 0;
        cursor: pointer;
    }

    .dialog {
        text-align: center;
        display: inline-block;
        width: 100%;
        font-size: 16px;
        color: #2dbe60;
    }

    button {
        margin: 10px;
    }
</style>