<!-- 配置界面 -->
<template>
    <div class="setting">
        <div class="title">
            <i class="el-icon-setting"></i>设置
        </div>
        <div class="container">
            <ul>
                <li>
                    <label>登录状态</label>
                    <el-switch v-model="configs.isUser" active-color="#13ce66"></el-switch>
                </li>
                <li>
                    <label>本地存储</label>
                    <el-switch v-model="configs.isLocalStorage" active-color="#13ce66"></el-switch>
                </li>
                <li>
                    <label>网络存储</label>
                    <el-switch v-model="configs.isWebStorage" active-color="#13ce66"></el-switch>
                </li>
            </ul>
        </div>
        <div class="footer">
            <el-button type="success" class="save" @click="saveConfig">保存配置</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            saveConfig() {
                this.$store.dispatch("configSave");
                this.$message({
                    message: '保存配置成功',
                    type: 'success'
                });
            }
        },
        computed: {
            configs(){
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
        padding: 15px 20px;
        border-bottom: 1px #ccc solid;
    }

    .setting li label {
        display: inline-block;
        width: 80%;

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