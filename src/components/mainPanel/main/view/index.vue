<!-- 浏览模式 -->
<template>
    <div class="viewPanel">
        <div id="screenArea">
            <div class="ViewHeader">
                <div class="title" v-text="note.title" :style="titleStyle"></div>
            </div>
            <div class="ViewContain" @dblclick="dblclick">
                <div class="ViewArea marked" v-html="note.html" :style="contentStyle"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        font() {
            return this.$store.state.data.fonts;
        },
        note() {
            return this.$store.state.note;
        },
        titleStyle() {
            return {
                "font-size": this.font.title.fontSize + "px",
                color: this.font.title.color,
                "font-weight": this.font.title.fontWeight,
            };
        },
        contentStyle() {
            let dark = this.$store.state.data.configs.isDark;
            return {
                "font-size": this.font.content.fontSize + "px",
                "line-height": this.font.content.lineHeight + "em",
                color:
                    dark && this.font.content.color == "#383838"
                        ? "#c7c7c7"
                        : this.font.content.color,
                "font-weight": this.font.content.fontWeight,
                "text-align": this.font.content.textAlign,
            };
        },
    },
    methods: {
        //双击编辑
        dblclick() {
            console.log("编辑模式");
            this.$emit("editMode", 1);
        },
    },
};
</script>
<style lang='scss' scoped>
.viewPanel {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    #screenArea {
        padding: 0px 50px;
        .mobie & {
            padding: 0px 20px;
        }
        .ViewHeader {
            height: 60px;
            margin-top: 10px;

            .title {
                width: 100%;
                height: 60px;
                line-height: 60px;
                border: none;
                outline: none;
                font-family: caecilia, times, serif;
                font-size: 28px;
                font-weight: 300;
                color: #2dbe60;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 1px 0px;
            }
        }

        .ViewContain {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding-bottom: 50px;

            .ViewArea {
                font-family: gotham, helvetica, arial, sans-serif;
                width: 100%;
                box-sizing: border-box;
                height: 100%;
                font-size: 14px;
                line-height: 1.5em;
                padding: 15px 0px 50px 0px;
                overflow: auto;

                
            }
        }
    }
}
</style>