# XY笔记3.0

XY笔记本是XY博客新尝试的一个轻量级的本地笔记本，是一款基于vue框架的笔记本，数据存储本地浏览器，默认支持markdown语法，支持图标数学等语法，支持即时渲染，支持截图分享等。


网站使用：https://notes.xygeng.cn/#/

## 功能：

- [x] 支持移动端
- [x] 支持markdown编辑,实现 CommonMark 和 GFM 规范
- [x] 支持即时渲染
- [x] 支持大纲、数学公式、脑图、图表、流程图、甘特图、时序图、五线谱、多媒体、语音阅读、标题锚点、代码高亮及复制、graphviz 渲染、plantumlUML图
- [x] 支持生成图片下载
- [x] 支持生成markdown文件
- [x] 支持字符计数
- [ ] 支持历史记录查看
- [ ] 支持多功能附件，思维导图等


## 截图

![](./screenshot/1.png)



## 编译打包


### 安装依赖（基于node、yarn环境）

```bash
yarn

```

### 打包产物
```bash
yarn build
```

### 上传服务器


> 产物为dist文件