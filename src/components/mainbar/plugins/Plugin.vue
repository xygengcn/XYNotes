<template>
    <div class="plugin item noselect">
        <div class="title">
            <span>{{ data.name }}</span>
            <em class="tag">{{ data.version }}</em>
        </div>
        <div class="itemContent">
            <small>{{ data.intro }}</small>
        </div>
        <div class="itemTool">
            <p class="author">{{ data.author }}</p>
            <el-tag type="success" size="mini" v-if="!data.status" @click="install(data)">
                <span>安装</span>
            </el-tag>
            <i class="el-icon-setting" v-if="data.status" @click="to(data.id)"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: ["data"],
    methods: {
        to(id) {
            if (this.$store.state.isMobie) {
                this.$router.push({
                    path: `/m/plugins/${id}`,
                });
            } else {
                this.$router.push({
                    path: `/plugins/${id}`,
                });
            }
        },
        install(plugin) {
            this.$confirm("安装插件将会重载环境，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "info",
            })
                .then(() => {
                    this.$store.dispatch("PLUGIN_INSTALL_UNSTALL", plugin);
                    this.$utils.reload();
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消安装",
                    });
                });
        },
    },
};
</script>

<style>
.item {
    box-sizing: border-box;
    padding: 15px 24px;
    border: 1px solid transparent;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
    color: #333;
    cursor: pointer;
}

.item .title .tag {
    font-style: normal;
    color: #adacac;
    font-size: 14px;
    margin-left: 10px;
}

.item .itemHeader {
    font-family: gotham, helvetica, arial, sans-serif;
    font-size: 18px;
    font-weight: 400;
    height: 30px;
    margin-bottom: 5px;
    max-height: 40px;
    overflow: hidden;
    overflow-wrap: break-word;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: break-word;
    line-height: 30px;
    width: 200px;
}

.item .itemContent {
    margin: 15px 0px;
    color: #878787;
    overflow: hidden;
}

.item .itemContent small {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.item .itemTool {
    display: flex;
    align-items: center;
    margin: 10px 0px 0px;
}

.item .itemTool i {
    color: #878787;
}
.item .itemTool .author {
    flex: 1;
    font-weight: 600;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    color: #878787;
    margin: 0px;
}

.item:hover {
    border-color: #2dbe60;
}
</style>