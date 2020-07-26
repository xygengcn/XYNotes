## 插件接口

### 使用教程

#### 格式

```js
$_plugins.extend(hook接口, 自定义命名, 自定义函数);
```

#### 实例

```javascript
$_plugins.extend("start", "hello",function(){
    console.log("hello world");//程序启动后打印hello world
    console.log(this); //this指向vue
});
```

#### 函数this

> 自定义函数this指向全局vue，可以调用vue相关数据，包括vuex，vue-router等



### Hook接口

| Hook       | 参数       | 名称           | 备注               |
| ---------- | ---------- | -------------- | ------------------ |
| start      | ()         | 程序开始运行时 |                    |
| beforeEach | (to, from) | 路由切换时     |                    |
| afterEach  | (to, from) | 路由切换后     |                    |
| saved      | (note)     | 自动保存时     | 可用于笔记上传网络 |




### ui支持调用（element UI）
