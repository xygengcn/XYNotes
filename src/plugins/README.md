## 插件接口文档

### 使用教程

为了自定义拓展笔记本功能，例如实现网络同步化，开发本地插件，开发更多功能，支持XYNotes-1.2.0以上版本。

#### 简单运用

##### 接口

```js
$plugins.extend(hook接口, 插件id, 自定义函数);
```

##### 实例

```js
$plugins.extend("start", "hello",function(){
    console.log("hello world");//程序启动后打印hello world
    console.log(this); //this指向vue
});
```

#### 高级运用

##### 接口

> option的id， 插件id，界面新建的id，三者需保持一致

```js
$plugins.option(`option自定义配置`).extend(`hook接口`, `插件id`, `自定义函数`);//配置格式如下
```

##### option配置格式

> 配置自定义，可以定义两种方式，对象类型和字符串类型



| 属性    | 类型          | 名称           | 说明                               |
| ------- | ------------- | -------------- | ---------------------------------- |
| id      | string        | 插件id         | 必填                               |
| options | string/object | 插件自定义配置 | 选填，配置页面可修改，具体看实例   |
| pages   | object        | 插件自定义页面 | 选填，点击设置即可看到，具体看实例 |



配置实例

```js
var option = {
     id: "test",//必备属性，对应插件的id一致，不一致无法获取配置
     options:{
        //下面配置自定义，可以定义两种方式，对象类型和字符串类型
        api: {
            label: "接口地址",//配置界面显示名称
            value: "localhost"//默认值
        },
        type: "post"//默认值，名称与label相同
     },
    pages:{
        test:{//页面id
            name:"测试",
            html："<h1>测试自定义页面</h1>"
        }
    }
}
```



##### 代码实例

> 复杂运用比简单运用添加了配置可用户自定义，其他一样

```js
var option = {
     id: "test",//必备属性，对应插件的id一致，不一致无法获取配置
     options:{
        //下面配置自定义，可以定义两种方式，对象类型和字符串类型
        api: {
            label: "接口地址",//配置界面显示名称
            value: "localhost"//默认值
        },
        type: "post"//默认值，名称与label相同
     },
    pages:{
        test:{//页面id
            name:"测试",
            html："<h1>测试自定义页面</h1>"
        }
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

| Hook       | 参数       | 参数说明 | 名称           | 备注               |
| ---------- | ---------- | -------------- | ------------------ | ------------------ |
| start      | (option)         | 默认插件属性，来回路由信息 | 初始化时 | 可用于初始化数据   |
| beforeEach | (option,to, from) | object类型，来回路由信息 | 路由切换时     | 可用于记录路由记录 |
| afterEach  | (option,to, from) | object类型，来回路由信息 | 路由切换后     | 可用于获取切换记录 |
| saved      | (option,note)     | object类型，正在修改的笔记信息 | 自动保存时     | 可用于笔记上传网络 |
| enterPage | (option,page) | function类型，（页面id，html字符串） | 进入自定义页面 | 可用于修改自定义页面 |



### ui支持调用（element UI）

#### Notification 通知

用法：https://element.faas.ele.me/#/zh-CN/component/notification

#### MessageBox 弹框

用法：https://element.faas.ele.me/#/zh-CN/component/message-box

#### Message 消息提示

用法：https://element.faas.ele.me/#/zh-CN/component/message