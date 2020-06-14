<!-- 配置界面 -->
<template>
    <div class="setting">
        <div class="title">
            <i class="el-icon-setting"></i>设置
        </div>
        <div class="container">
            <ul>
                <li>
                    <label>本地存储</label>
                    <el-switch v-model="configs.isLocalStorage" active-color="#13ce66"></el-switch>
                </li>
                <li>
                    <label>网络存储</label>
                    <el-switch v-model="configs.isWebStorage" active-color="#13ce66"></el-switch>
                </li>
                <li>
                    <label>恢复设置</label>
                    <el-button type="danger" size="mini" @click="recover">恢复</el-button>
                </li>
                <li>
                    <label>恢复出厂</label>
                    <el-button type="danger" size="mini" @click="rebuild">恢复</el-button>
                </li>
            </ul>
        </div>
        <div class="footer">
            <el-button type="success" class="save" @click="saveConfig">保存配置</el-button>
        </div>
    </div>
</template>
<script>
    import storage from '../store/data';
    export default {
        data() {
            // let size =this.$utils.sizeof(JSON.stringify(this.$store.state.data));
            return {}
        },
        methods: {
            saveConfig() {
                this.$store.dispatch("configSave");
                this.$message({
                    message: '保存配置成功',
                    type: 'success'
                });
            },
            rebuild() {
                this.$confirm('操作数据清空，配置默认！建议操作前备份数据！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    storage.clean();
                    this.$message({
                        type: 'success',
                        message: '恢复成功!'
                    })
                    window.location = '/';
                }).catch(e => {
                    this.$message({
                        type: 'info',
                        message: '取消恢复'
                    });
                });
            },
            recover() {
                this.$confirm('配置恢复！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem("XYNOTESCONFIGS");
                    localStorage.removeItem("XYNOTESFONT");
                    this.$message({
                        type: 'success',
                        message: '恢复成功!'
                    })
                    window.location = '/';
                }).catch(e => {
                    this.$message({
                        type: 'info',
                        message: '取消恢复'
                    });
                });
            }
        },
        computed: {
            configs() {
                return this.$store.state.data.configs;
            }
        }
    }
</script>
<style scoped>
    .setting {
        color: #878787;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    ul,
    li {
        list-style: none;
        text-decoration: none;
        margin: 0;
        padding: 0;
    }

    .setting li {
        display: flex;
        padding: 15px 20px;
        border-bottom: 1px #ccc solid;
    }

    .setting li label {
        flex: 1;
    }

    .container {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        padding-bottom: 20px;
    }

    .setting>.title {
        padding: 0px 20px;
        height: 60px;
        border-bottom: 1px solid #d9d9d9;
        line-height: 60px;
    }

    .setting .title i {
        margin-right: 10px;
    }

    .footer {

        margin: 30px;
    }

    .footer .save {
        width: 100%;
    }
</style>