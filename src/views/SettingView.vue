<!-- 配置界面 -->
<template>
    <div class="setting">
        <page-view :title="'设置'" :icon="'el-icon-setting'">
            <div class="setting-container">
                <ul>
                    <li>
                        <label>本地存储</label>
                        <el-switch
                            v-model="configs.isLocalStorage"
                            active-color="#13ce66"
                            @change="saveConfig"
                        ></el-switch>
                    </li>
                    <li>
                        <label>网络存储</label>
                        <el-switch
                            v-model="configs.isWebStorage"
                            active-color="#13ce66"
                            @change="saveConfig"
                        ></el-switch>
                    </li>
                    <li>
                        <label>黑暗主题</label>
                        <el-switch
                            v-model="configs.isDark"
                            active-color="#13ce66"
                            @change="saveConfig"
                        ></el-switch>
                    </li>
                    <li>
                        <label>本地恢复</label>
                        <span class="backup-span">
                            <el-button type="info" size="mini">恢复</el-button>
                            <input
                                type="file"
                                accept=".xy"
                                @change="inputFile($event)"
                                id="localUp"
                            />
                        </span>
                    </li>
                    <li>
                        <label>本地备份</label>
                        <el-button type="info" size="mini" @click="localBackup">备份</el-button>
                    </li>
                    <li>
                        <label>重置设置</label>
                        <el-button type="danger" size="mini" @click="recover">重置</el-button>
                    </li>
                    <li>
                        <label>恢复出厂</label>
                        <el-button type="danger" size="mini" @click="rebuild">恢复</el-button>
                    </li>
                    <li>
                        <label>版本{{configs.version}}</label>
                        <el-button type="danger" size="mini" @click="updata">更新</el-button>
                    </li>
                </ul>
            </div>
            <div class="version">
                Copyright &copy; 2020 Version {{configs.version}} By
                <el-link
                    href="https://github.com/xygengcn/XYNotes"
                    target="_blank"
                    :underline="false"
                    class="github"
                >XYNotes</el-link>
            </div>
        </page-view>
    </div>
</template>
<script>
import PageView from "../components/PageView";
import storage from "../store/data/data";
export default {
    components: {
        PageView,
    },
    data() {
        return {};
    },
    methods: {
        updata() {
            this.$utils.reload();
        },
        //保存配置
        saveConfig() {
            this.$store.dispatch("configSave");
        },
        //恢复出厂
        rebuild() {
            this.$confirm(
                "操作数据清空，配置默认！建议操作前备份数据！",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    storage.clean();
                    this.$message({
                        type: "success",
                        message: "恢复成功!",
                    });
                    window.location = "/";
                })
                .catch((e) => {
                    this.$message({
                        type: "info",
                        message: "取消恢复",
                    });
                });
        },
        //重置配置
        recover() {
            this.$confirm("重置配置！", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    localStorage.removeItem("XYNOTESCONFIGS");
                    localStorage.removeItem("XYNOTESFONT");
                    this.$message({
                        type: "success",
                        message: "恢复成功!",
                    });
                    window.location = "/";
                })
                .catch((e) => {
                    this.$message({
                        type: "info",
                        message: "取消恢复",
                    });
                });
        },
        //恢复数据
        inputFile(event) {
            const reader = new FileReader();
            reader.readAsText(event.target.files[0]);
            reader.onload = (e) => {
                let data = JSON.parse(
                    decodeURIComponent(escape(window.atob(e.target.result)))
                );
                this.$store.dispatch("recover", data);
            };
        },
        //备份
        localBackup() {
            let data = JSON.stringify(this.$store.state.data);
            data = window.btoa(unescape(encodeURIComponent(data)));
            this.$utils.download(data, "xy笔记.xy");
        },
    },
    computed: {
        configs() {
            return this.$store.state.data.configs;
        },
    },
};
</script>
<style scoped>
.setting {
    height: 100%;
}

li {
    display: flex;
    padding: 15px 20px;
    border-bottom: 1px #ccc solid;
}

li label {
    flex: 1;
}

.backup-span {
    width: 56px;
    cursor: pointer;
    position: relative;
}

.backup-span input {
    width: 100%;
    height: 100%;
    opacity: 0;
    background: #cccccc;
    position: absolute;
    left: 0;
    cursor: pointer;
    filter: alpha(opacity=0);
}

.version {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 10px 0px 20px;
    font-size: 12px;
    text-align: center;
}
.version .github {
    font-size: 12px;
    color: #878787;
}
</style>