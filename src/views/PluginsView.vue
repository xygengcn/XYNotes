<template>
    <div id="plugins">
        <page-view :title="'插件库'" :icon="'el-icon-s-grid'">
            <ul>
                <li class="ListItem" v-for="(item,index) in data" :key="index">
                    <plugin-item :data="item"></plugin-item>
                <li v-if="data.length==0" class="blank">文章为空</li>
            </ul>
        </page-view>
        <div class="addItem"><el-button icon="el-icon-plus" @click="addItem" circle=""></el-button></div>
    </div>
</template>

<script>
    import PageView from "../components/PageView";
    import PluginItem from "../components/PluginItem"
    export default {
        components: {
            PageView,
            PluginItem
        },
        computed: {
            data() {
                return this.$store.state.data.plugins;
            }
        },
        methods:{
            addItem(){
                console.log("添加插件");
                let plugin ={
                    name:"sss",
                    version:"1.0.0",
                    author:"xxx",
                    status:false,
                    description:"ss"
                }
                this.$store.commit("addPlugin",plugin);
            }
        }

    }
</script>

<style scoped>
    #plugins {
        position: relative;
        height: 100%;
    }

    #plugins .addItem {
        position: absolute;
        margin: 0px auto;
        bottom: 15px;
        left: 0;
        right: 0;
        line-height: 30px;
        font-size: 1.5em;
        text-align: center;
    }
    #plugins .addItem button{
        color:#fff;
        background-color:#2dbe60 ;
        border-color:#2dbe60 ;
    }
    #plugins .addItem button:hover{
        opacity: .8;
    }
</style>