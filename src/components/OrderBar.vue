<!-- 排序样式 -->
<template>
  <div id="OrderBar">
    <legend>排序方式</legend>
    <ul>
      <li @click="order('created','asc')">
        创建时间（最早优先）
        <i class="el-icon-check active" v-if="sortkey.key=='created'&&sortkey.order=='asc'"></i>
      </li>
      <li @click="order('created','desc')">
        创建时间（最晚优先）
        <i class="el-icon-check active" v-if="sortkey.key=='created'&&sortkey.order=='desc'"></i>
      </li>
      <li @click="order('updated','asc')">
        更新时间（最早优先）
        <i class="el-icon-check active" v-if="sortkey.key=='updated'&&sortkey.order=='asc'"></i>
      </li>
      <li @click="order('updated','desc')">
        更新时间（最晚优先）
        <i class="el-icon-check active" v-if="sortkey.key=='updated'&&sortkey.order=='desc'"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props:["sortkey"],
  methods: {
    order(key, order) {
      this.$emit("isOrder",{key:key,order:order});
    }
  }
};
</script>
<style lang='css' scoped>
#OrderBar {
  width: auto;
  background: #ffffff;
  z-index: 9;
  font-family: gotham, helvetica, arial, sans-serif;
  font-size: 13px;
  font-weight: 500;
  padding: 10px 0px;
  left: 300px;
  position: absolute;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.04),
    -6px 8px 15px rgba(0, 0, 0, 0.04), 6px 8px 15px rgba(0, 0, 0, 0.04);
  cursor: default;
}
#OrderBar legend {
  font-size: 11px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ababab;
  margin: 7px 0 12px 20px;
}
#OrderBar ul li {
  color: #606060;
  cursor: pointer;
  padding: 9px 30px 10px 20px;
  transition-duration: 0.1s;
  transition-timing-function: ease-in-out;
}
#OrderBar li .active {
  color: #2dbe60;
}
#OrderBar li:hover{
  color:#ccc;
}
</style>