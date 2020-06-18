<!-- 字体弹窗 -->
<template>
    <el-dialog title="字体选择" :visible.sync="isShow" :show-close="false" center custom-class="fontDialog"
        :close-on-click-modal="false">
        <el-form :model="font">
            <el-form-item label="字体大小">
                <el-select v-model="font.size" placeholder="请选择">
                    <el-option v-for="item in fontSize" :label="item" :value=item :key="item"></el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="段落行高">
                <el-select v-model="font.lineHeight" placeholder="请选择">
                    <el-option  label="单倍行距" value="1.0"></el-option>
                    <el-option  label="1.5倍行距" value="1.5"></el-option>
                    <el-option  label="双倍行距" value="2.0"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button @click="save" type="primary">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    export default {
        props: ["isShow"],
        data() {
            return {
                fontSize:[8,10,12,14,16,18,20,22,24,26,28]
            }
        },
        methods: {
            close() {
                this.$emit("close");
            },
            save(){
                this.$store.dispatch("fontSave");
                this.$emit("close");
            }
        },
        computed: {
            font() {
                return this.$store.state.data.font;
            }
        },
        watch: {

        }
    }
</script>