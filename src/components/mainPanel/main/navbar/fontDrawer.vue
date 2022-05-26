<!-- 字体弹窗 -->
<template>
    <div id="navbar-font">
        <el-drawer title="字体选择" :visible.sync="isShow" direction="btt" :before-close="handleClose" size="40%" :modal="false">
            <el-form :model="font">
                <div class="el-form-title">标题</div>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="字体大小">
                            <el-select v-model="font.title.fontSize" placeholder="请选择">
                                <el-option v-for="item in fontSize" :label="item" :value="item" :key="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="字体粗细">
                            <el-select v-model="font.title.fontWeight" placeholder="请选择">
                                <el-option v-for="item in fontWeight" :label="item" :value="item" :key="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="字体颜色">
                            <div class="el-form-color">
                                <div class="wrap">
                                    <el-input v-model="font.title.color"></el-input>
                                    <el-color-picker v-model="font.title.color"></el-color-picker>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="el-form-title">正文</div>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="字体大小">
                            <el-select v-model="font.content.fontSize" placeholder="请选择">
                                <el-option v-for="item in fontSize" :label="item" :value="item" :key="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="字体粗细">
                            <el-select v-model="font.content.fontWeight" placeholder="请选择">
                                <el-option v-for="item in fontWeight" :label="item" :value="item" :key="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="段落行高">
                            <el-select v-model="font.content.lineHeight" placeholder="请选择">
                                <el-option label="单倍行距" value="1.0"></el-option>
                                <el-option label="1.5倍行距" value="1.5"></el-option>
                                <el-option label="双倍行距" value="2.0"></el-option>
                                <el-option label="2.5倍行距" value="2.5"></el-option>
                                <el-option label="三倍行距" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="字体颜色">
                            <div class="el-form-color">
                                <div class="wrap">
                                    <el-input v-model="font.content.color"></el-input>
                                    <el-color-picker v-model="font.content.color"></el-color-picker>
                                </div>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="6">
                        <el-form-item label="文本对齐">
                            <el-select v-model="font.content.textAlign" placeholder="请选择">
                                <el-option v-for="item in textAlign" :label="item.label" :value="item.value" :key="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </el-drawer>
    </div>

</template>
<script>
export default {
    props: ["isShow"],
    data() {
        return {
            fontSize: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
            fontWeight: [
                100,
                200,
                300,
                400,
                500,
                600,
                700,
                800,
                900,
                "normal",
                "bold",
                "bolder",
                "lighter",
            ],
            textAlign: [
                { value: "left", label: "左侧对齐" },
                { value: "right", label: "右侧对齐" },
                { value: "center", label: "居中对齐" },
                { value: "justify", label: "两端对齐" },
                { value: "inherit", label: "默认" },
            ],
        };
    },
    methods: {
        handleClose() {
            this.$emit("close");
            this.$store.dispatch("SAVE_DATA_ITEM", "fonts");
            console.success("字体配置保存成功");
        },
    },
    computed: {
        font() {
            return this.$store.state.data.fonts;
        },
    },
};
</script>
<style lang="scss">
#navbar-font {
    .el-drawer {
        .el-drawer__header {
            margin-bottom: 0px;
            padding: 10px;
            line-height: 30px;
            .mobie & {
                line-height: 20px;
            }
        }
        .el-drawer__body {
            overflow: auto;
            .el-form {
                padding: 10px;
                line-height: 30px;
                .el-form-title {
                    font-size: 16px;
                    color: #000;
                    margin-bottom: 10px;
                    border-bottom: $border-default;
                }

                .el-form-item {
                    margin-bottom: 10px;
                    text-align: center;
                    .el-form-item__content {
                        font-size: 12px;
                    }
                    .el-form-color {
                        display: inline-block;
                        width: 217px;
                        .wrap {
                            display: flex;
                            width: 100%;

                            .el-input {
                                margin-right: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>