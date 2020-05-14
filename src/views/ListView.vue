<!-- 笔记列表 -->
<template>
    <div class="ListView">
        <div class="ListHeader">
            <div class="ListTitle">笔记</div>
            <div class="ListNav">
                <small>0条笔记</small>
                <small @click="isOrder =!isOrder">选项<i class="el-icon-arrow-down"></i></small>
                <OrderBar id="OrderBar" v-if="isOrder" @isOrder="order" :sortkey="sortkey"></OrderBar>
            </div>
        </div>
        <div class="SearchBar">
            <span class="search">
                <form class="search-form">
                    <input class="search-input" type="text" placeholder="搜索笔记" v-model="searchkey" />
                    <i class="el-icon-search search-icon"></i>
                </form>
            </span>
        </div>
        <div class="NoteList">
            <ul>
                <li class="ListItem" v-for="(item,index) in data" :key="index" @click="setActive(item)">
                    <Note :data="item"></Note>
                </li>
                <li v-if="this.data.length==0" class="blank">文章为空</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import OrderBar from "../components/OrderBar";
    import Note from "../components/NoteItem";
    export default {
        components: {
            OrderBar,
            Note
        },
        data() {
            return {
                searchkey: "",
                sortkey: {
                    key: "created",
                    order: "asc"
                },
                isOrder: false
            };
        },
        computed: {
            data() {
                let notes = this.$store.state.data.notes || [];
                return notes.filter(item => {
                    if (item.title.includes(this.searchkey) || item.text.includes(this.searchkey)) {
                        return item;
                    }
                }).sort(this.compare());
            }
        },
        methods: {
            setActive(item) {
                this.$store.commit("setActive", item);
            },
            //排序
            compare() {
                return (a, b) => {
                    var aa = a[this.sortkey.key];
                    var bb = b[this.sortkey.key];
                    if (this.sortkey.order == "desc") return bb - aa;
                    else return aa - bb;
                };
            },
            order(sortkey) {
                this.isOrder = !this.isOrder;
                this.sortkey = sortkey;
            }
        }
    };
</script>

<style scoped>
    .ListView {
        height: 100%;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .ListHeader {
        height: 100px;
        color: #878787;
        padding: 20px 24px 15px;
        border-bottom: 1px solid #d9d9d9;
    }

    .ListTitle {
        display: inline-block;
        vertical-align: top;
        font-size: 21px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-weight: 300;
        line-height: 26px;
        margin-bottom: 20px;
    }

    .ListNav small:nth-child(2) {
        float: right;
        position: relative;
        cursor: pointer;
    }


    .ListView .NoteList {
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        padding-bottom: 20px;
    }

    .ListView ul {
        list-style: none;
        text-decoration: none;
        padding: 0;
        margin: 0;
    }

    .ListView ul li {
        color: #333;
    }

    .ListView .ListItem {
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
    }


    /*搜索 */
    .SearchBar {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        border-bottom: 1px #d9d9d9 solid;
        -webkit-app-region: drag;
    }

    .SearchBar .search {
        width: 300px;
        height: 60px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
    }

    .search .search-form {
        position: relative;
        margin: 0px 20px;
        width: 100%;
        height: 36px;
    }

    .search-input {
        width: 100%;
        outline: none;
        height: 36px;
        box-sizing: border-box;
        padding: 5px 40px 5px 30px;
        border-radius: 25px;
        border: 1px solid #e7e7e7;
        background: transparent;
        transition: all 0.3s linear;
        position: absolute;
        top: 0;
        right: 0;
        -webkit-app-region: no-drag;
        -webkit-appearance: none;
    }

    .search-input:focus {
        border: 1px solid #cccccc;
    }

    .search .search-icon {
        height: 36px;
        width: 36px;
        cursor: pointer;
        position: absolute;
        top: 0px;
        right: 0;
        text-align: center;
        line-height: 36px;
        background: transparent;
        color: #d9d9d9;
    }

    .blank {
        color: #cccccc !important;
        text-align: center;
        padding: 50px;
    }
</style>