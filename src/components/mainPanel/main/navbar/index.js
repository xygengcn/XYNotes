import html2canvas from "@/utils/html2canvas";
//截图
function screenshot() {
    if (this.mode == 0) {
        HtmlToImage.call(this);
    } else {
        this.$notify({
            title: "编辑模式不可截图分享",
            type: "warning",
        });
    }
}
//生成图片
function HtmlToImage() {
    let el = document.querySelector("#screenArea");
    var option = {
        useCORS: true,
        scale: 2,
    };
    this.$store.commit("SET_LOADING", true);
    html2canvas(el, option).then((canvas) => {
        this.$store.commit("SET_LOADING", false);
        this.img.url = canvas.toDataURL("image/png");
        this.img.download = this.$utils.base64ImgtoFile(
            this.img.url,
            this.note.title
        );
        this.img.name = this.img.download.name;
        this.img.download = this.$utils.dataToUrl(this.img.download);
        this.isShowScreenShotDialog = true;
    });
}

function delNote(item, isMobie = false) {
    this.$confirm("是否删除笔记?", "提示", {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            confirmButtonClass: "el-button--danger",
            type: "warning",
        })
        .then(() => {
            if (isMobie) {
                this.$router.go(-1);
            }
            this.$store.dispatch("DELETE_NOTE", item);
            this.$message({
                type: "success",
                message: "删除成功!",
            });
        })
        .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除",
            });
        });
}

function lock() {
    this.$prompt("请输入密码", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputType: "password",
            inputValue: this.note.password,
        })
        .then(({
            value
        }) => {
            this.$store.commit("SET_NOTE_PASSWORD", value);
            this.$message({
                type: "success",
                message: "修改成功",
            });
        })
        .catch((err) => {
            this.$message({
                type: "info",
                message: err,
                duration: 500,
            });
        });
}
//切换编辑
function setMode(mode) {
    this.$store.commit("SET_NOTE_MODE", mode);
}
//标记
function markNote(item) {
    this.$store.commit("SET_NOTE_MARK", item);
}
//全屏
function fullScreen() {
    this.$emit("fullScreen", this.isFullScreen);
}

export default {
    screenshot,
    delNote,
    lock,
    setMode,
    fullScreen,
    markNote
}