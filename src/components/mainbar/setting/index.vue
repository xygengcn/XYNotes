<!-- 配置界面 -->
<template>
  <div class="setting">
    <page :title="'设置'" :icon="'el-icon-setting'">
      <div class="setting-container" slot="body">
        <ul>
          <li class="item">
            <label>本地存储</label>
            <el-switch
              v-model="configs.isLocalStorage"
              active-color="#13ce66"
              @change="saveConfig"
            ></el-switch>
          </li>
          <li class="item">
            <label>黑暗主题</label>
            <el-switch
              v-model="configs.isDark"
              active-color="#13ce66"
              @change="saveConfig"
            ></el-switch>
          </li>
          <li class="item">
            <label>数据迁移</label>
            <span class="backup-span">
              <el-button type="success" size="mini" @click="dataMigration()"
                >迁移</el-button
              >
            </span>
          </li>
          <li class="item">
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
          <li class="item">
            <label>本地备份</label>
            <el-button type="info" size="mini" @click="localBackup"
              >备份</el-button
            >
          </li>
          <li class="item">
            <label>重载配置</label>
            <el-button type="danger" size="mini" @click="recover"
              >重置</el-button
            >
          </li>
          <li class="item">
            <label>恢复出厂</label>
            <el-button type="danger" size="mini" @click="rebuild"
              >恢复</el-button
            >
          </li>
          <li class="item">
            <label>版本{{ version }}</label>
            <el-button size="mini" @click="about">关于</el-button>
          </li>
        </ul>
      </div>
    </page>
  </div>
</template>
<script>
import page from "@/components/mainbar/components/page";
import storage from "@/store/data/data";
import Database from "ts-database";
export default {
  components: {
    page,
  },
  data() {
    return {};
  },
  methods: {
    // 数据迁移函数
    dataMigration() {
      this.$confirm(
        "即将把数据迁移到v3版本，不影响v3版本和本版本，确认迁移吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const notes = this.$store.state.data.notes.map((note) => {
            return {
              nid: this.$utils.uuid(),
              // 笔记标题
              title: note.title,
              // 笔记内容
              text: note.text,
              // 笔记创建时间
              createdAt: note.created,
              // 笔记最新更新时间
              updatedAt: note.updated,
              // 简要信息
              intro: note?.text?.trim()?.slice(0, 50) || "",
              // 笔记状态
              order: 0,
              attachment: [],
              author: "",
              type: "text",
              origin: "",
            };
          });
          const database = new Database({
            name: "XYNOTES_V3",
            version: 1,
            modules: [{ name: "notes", primary: "nid", columns: [] }],
          });
          database
            .module("notes")
            .then((module) => {
              return module.bulkCreate(notes);
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "迁移成功!",
              });
              window.location = "/";
            });
        })
        .catch((e) => {
          this.$message({
            type: "info",
            message: "取消迁移",
          });
        });
    },
    about() {
      if (this.$store.state.isMobie) {
        this.$router.push({
          path: "/m/about",
        });
      } else {
        this.$router.push({
          path: "/about",
        });
      }
    },
    //保存配置
    saveConfig() {
      this.$store.dispatch("SAVE_DATA_ITEM", "configs");
    },
    //恢复出厂
    rebuild() {
      this.$confirm("操作数据清空，配置默认！建议操作前备份数据！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
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
      this.$confirm("重载配置，可修复部分问题！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("XYNOTESCONFIGS");
          localStorage.removeItem("XYNOTESFONTS");
          localStorage.removeItem("XYNOTESPLUGINS");
          this.$message({
            type: "success",
            message: "恢复成功!",
          });
          this.$utils.reload();
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
        this.$store.dispatch("BACKUP_RECOVER", data);
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
    version() {
      return this.$store.state.data.version;
    },
    configs() {
      return this.$store.state.data.configs;
    },
  },
};
</script>
<style lang="scss" scoped>
.setting {
  height: 100%;
}

li {
  display: flex;
  padding: 15px 20px;
  border-bottom: $border-default;
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
</style>