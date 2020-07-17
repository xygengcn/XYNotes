<template>
    <div class="addPlugin">
        <div class="addItem">
            <el-button @click="dialogFormVisible = true;">添加插件</el-button>
        </div>
        <el-dialog title="新增插件" :visible.sync="dialogFormVisible">
            <el-form :model="plugin">
                <el-form-item label="插件ID" label-width="100">
                    <el-input v-model="plugin.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="插件名称" label-width="100">
                    <el-input v-model="plugin.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="插件链接" label-width="100">
                    <el-link :underline="false">
                        <i class="el-icon-warning-outline el-icon--right"></i>
                    </el-link>
                    <el-input v-model="plugin.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="插件版本" label-width="100">
                    <el-input v-model="plugin.version" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="插件作者" label-width="100">
                    <el-input v-model="plugin.author" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="插件状态" label-width="100">
                    <el-select v-model="plugin.status" placeholder="是否开启">
                        <el-option label="开启" value="true"></el-option>
                        <el-option label="关闭" value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="插件描述" label-width="100">
                    <el-input v-model="plugin.intro" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible =false">取 消</el-button>
                <el-button type="primary" @click="addItem">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            plugin: {
                id: "",
                name: "",
                url: "",
                status: "",
                version: "0.0.1",
                intro: "",
                status: "false"
            }
        };
    },
    methods: {
        addItem() {
            console.log(this.plugin);
            this.dialogFormVisible = false;
            this.$store.commit("addPlugin", this.plugin);
            this.$message({
                message: "插件添加成功，刷新后生效",
                type: "success"
            });
        }
    }
};
</script>

<style scoped>
.el-select {
    width: 100%;
}

.addItem {
    position: absolute;
    margin: 0px auto;
    bottom: 15px;
    left: 0;
    right: 0;
    line-height: 30px;
    font-size: 1.5em;
    text-align: center;
}

.addItem button {
    color: #fff;
    background-color: #2dbe60;
    border-color: #2dbe60;
}

.addItem button:hover {
    opacity: 0.8;
}
</style>