<!-- 笔记列表 -->
<template>
    <div class="ListView">
        <div class="ListHeader">
            <div class="ListTitle">笔记</div>
            <div class="ListNav">
                <small>{{data.length}}条笔记</small>
                <order class="order" />
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
import Note from "@/components/mainbar/common/Note";
import order from "@/components/mainbar/notes/Orderbar";
export default {
    components: {
        Note,
        order,
    },
    data() {
        return {
            searchkey: "",
        };
    },
    computed: {
        data() {
            let notes = this.$store.state.data.notes || [];
            return notes.filter((item) => {
                if (
                    item.title.includes(this.searchkey) ||
                    item.text.includes(this.searchkey)
                ) {
                    return true;
                }
                return false;
            });
        },
    },
    methods: {
        setActive(item) {
            this.$store.commit("SET_NOTE_ACTIVE", item);
            if (this.$store.state.isMobie) {
                this.$router.push("/m/note");
            }
        },
    },
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

.ListNav .order {
    float: right;
    position: relative;
    cursor: pointer;
    color: #878787;
}

.ListView .NoteList {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    padding-bottom: 20px;
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
    width: 100%;
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
</style>