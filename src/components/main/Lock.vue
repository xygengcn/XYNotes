<template>
    <div class="lock">
        <div class="form">
            <h3>该笔记上锁了</h3>
            <div class="form-item">
                <el-input type="age" v-model="password" autocomplete="off" placeholder="输入解锁密码" @keyup.enter.native="submitForm()"></el-input>
            </div>
            <div class="form-item">
                <el-button type="primary" @click="submitForm()">查看笔记</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["note"],
    data() {
        return {
            password: "",
        };
    },
    methods: {
        submitForm() {
            if (this.password == this.note.password) {
                this.$store.commit("ADD_NOTE_HISTORY", this.note.nid);
                this.$message({
                    message: "已解锁",
                    type: "success",
                });
                return true;
            }
            this.$message.error("密码错误");
        },
    },
};
</script>

<style lang="scss" scoped>
.lock {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    .form {
        width: 80%;
        max-width: 400px;
        position: relative;
        top: -60px;
        h3 {
            text-align: center;
            color: $theme-color;
            font-size: 1.5em;
        }
        .form-item {
            margin: 10px;
            button {
                width: 100%;
                border-color: $theme-color;
                background-color: $theme-color;
            }
        }
    }
}
</style>