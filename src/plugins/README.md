## 插件接口文档

### 使用教程

#### 简单运用

##### 接口

```js
$plugins.extend(hook接口, 插件id, 自定义函数);
```

##### 实例

```javascript
$plugins.extend("start", "hello",function(){
    console.log("hello world");//程序启动后打印hello world
    console.log(this); //this指向vue
});
```



#### 复杂运用

##### 接口

> option的id， 插件id，新建插件的id，三者需保持一致

```js
$plugins.option(option自定义配置).extend(hook接口, 插件id, 自定义函数);//配置格式如下
```

##### option配置格式

> 配置自定义，可以定义两种方式，对象类型和字符串类型

```js
var option = {
     id: "test",//必备属性，对应插件的id一致，不一致无法获取配置
    //下面配置自定义，可以定义两种方式，对象类型和字符串类型
     api: {
         label: "接口地址",//配置界面显示名称
         value: "localhost"//默认值
     },
     type: "post"//默认值，名称与label相同
}
```

##### 实例

> 复杂运用比简单运用添加了配置可用户自定义，其他一样

```js
var option = {
    id: "test",
    name: {
        label: "名称",
        value: "庚哥哥"
    }
}
$plugins.option(option).extend("start", "test", function(option) {
    this.$notify({
        title: '你好',
        message: option.name.value,
        type: 'success'
    });
})
```



#### 函数this

> 自定义函数this指向全局vue，可以调用vue相关数据，包括vuex，vue-router等



### Hook接口

| Hook       | 参数       | 名称           | 备注               |
| ---------- | ---------- | -------------- | ------------------ |
| start      | (option)         | 数据初始化结束时 | 可用于初始化数据   |
| beforeEach | (option,to, from) | 路由切换时     |                    |
| afterEach  | (option,to, from) | 路由切换后     | 可用于获取切换记录 |
| saved      | (option,note)     | 自动保存时     | 可用于笔记上传网络 |



### ui支持调用（element UI）

#### Notification 通知

用法：https://element.faas.ele.me/#/zh-CN/component/notification

#### MessageBox 弹框

用法：https://element.faas.ele.me/#/zh-CN/component/message-box

#### Message 消息提示

用法：https://element.faas.ele.me/#/zh-CN/component/message