<!-- 显示面板 -->
<template>
  <div id="TextContainer">
    <navbar @editMode="editMode" @fullScreen="fullScreen =!fullScreen" @Triggle="Triggle" @screenShot="screenShot">
    </navbar>
    <div class="EditContent" :class="{fullScreen:fullScreen}">
      <EditTextarea v-if="mode==1 || mode ==2" class="panel" id="EditTextarea"></EditTextarea>
      <ViewTextarea v-if="mode==0 || mode ==2" class="panel" ref="ViewTextarea" id="ViewTextarea"></ViewTextarea>
      <div class="closeFullScreen" v-if="fullScreen" @click="fullScreen =false">
        <el-tooltip class="item" effect="dark" content="关闭全屏" placement="top">
          <i class="el-icon-circle-close"></i>
        </el-tooltip>
      </div>
    </div>
    <el-dialog :visible.sync="imgShareDialog" width="70%" center :modal-append-to-body="false"
      custom-class="imgShareDialog">
      <span slot="title">
        <i class="note-camera"></i>笔记截图分享
      </span>
      <div class="dialogBody">
        <img :src="imgShareUrl" class="downloadImg" />
      </div>
      <span slot="footer" class="dialog-footer">
        <a :href="imgShareDownload" :download="imgName">
          <el-button @click="imgShareDialog = false" plain>保存截图</el-button>
        </a>
        <el-button @click="imgShareDialog = false" plain>取消分享</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import navbar from "../components/NavBar"
  import EditTextarea from "../components/EditTextarea";
  import ViewTextarea from "../components/ViewTextarea";
  import html2canvas from "html2canvas";
  export default {
    name: '',
    components: {
      navbar,
      EditTextarea,
      ViewTextarea
    },
    data() {
      return {
        mode: 0,
        fullScreen: false,
        imgShareDialog: false,
        imgShareUrl: "",
        imgShareDownload: {},
        imgName:""
      }
    },
    computed: {
      note() {
        return this.$store.state.note;
      }
    },
    methods: {
      editMode(mode) {
        this.mode = mode;
      },
      Triggle(is) {
        this.$emit('Triggle', is)
      },
      //截图
      screenShot() {
        if (this.mode == 0) {
          this.HtmlToImage();
        } else {
          this.$notify({
            title: "编辑模式不可截图分享",
            type: "warning"
          });
        }
      },
      //生成图片
      HtmlToImage() {
        html2canvas(this.$refs.ViewTextarea.$el).then(canvas => {
          this.imgShareUrl = canvas.toDataURL();
          this.imgShareDownload = this.$utils.base64ImgtoFile(this.imgShareUrl, this.note.title);
          this.imgName =this.imgShareDownload.name;
          this.imgShareDownload = this.$utils.dataToUrl(this.imgShareDownload);
          this.imgShareDialog = true;

        });
      }
    }
  }
</script>
<style scoped>
  #TextContainer {
    flex: 1;
    display: flex;
    height: 100%;
    max-height: 100%;
    flex-direction: column;
  }

  .EditContent {
    flex: 1;
    height: 100%;
    display: flex;
    position: relative;
  }

  .EditContent .panel {
    flex: 1;
    min-width: 50%;
  }
  #EditTextarea{
    border-right: 1px solid #f7f1f1;
  }

  .fullScreen {
    position: fixed;
    background: #fff;
    width: 100%;
    left: 0;
    right: 0;
  }

  .closeFullScreen {
    width: 3em;
    height: 3em;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
    margin: auto;
    cursor: pointer;
    color: #888;
  }

  .closeFullScreen i {
    font-size: 3em;
  }

  .closeFullScreen:hover {
    opacity: .8;
  }

  .imgShareDialog {
    color: #878787;
  }

  .imgShareDialog i {
    margin: 0px 10px;
    color: #878787;
  }

  .imgShareDialog .dialogBody {
    max-height: 600px;
    overflow: hidden;
  }

  .downloadImg {
    width: 100%;
    margin: 0px auto;
  }
  button{
    margin: 10px;
  }
</style>