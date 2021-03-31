<h1 align="center">一款Hexo端优美的MaterialDesign风格主题 MDM</h1>

<h3 align="center">简洁，轻巧，麻麻再也不用担心打开博客速度慢了</h3>
<br><br>

# 推荐
1. [Hexo 博文管理工具，麻麻再也不用担心忘记管理hexo博文的命令啦](https://github.com/TonyChenn/HexoBlogWriteTool)
2. [CSDN博文导出工具](https://github.com/TonyChenn/BlogExportTool)

# 更新介绍：
- 2021.3.25
1. 更新mdui到1.0.1并修复 日/夜间模式，一键置顶
2. 美化 headerbar,文章详情部分
3. 支持图片LazyLoad
4. 界面布局优化
5. 美化代码框

- 2021.1.1
- 升级hexo4.2.0后pwa无法使用, 解决方法看下面。

- 2020.11.12
1. 解决在IOS设备Safari浏览器上布局错乱问题

- 2020.10.31
1. 本地化支持
2. 取消缓存head.ejs,解决浏览器顶部Tab卡片中名称错误
3. 优化分享功能

- 2020-6-20
1. 文章置顶
2. 显示更新日期

- 2020-5-27：
1. PWA支持
2. 点击特效
3. 分享
4. 打赏

- 2020-4-10 : 
1. 添加站点地图
2. 添加灰色(哀悼)模式
3. 添加谷歌广告开关
4. 支持Emoji表情
5. 添加Gitalk 评论方式

- 2020-1-14 : 
1. 添加图片预览
2. 优化夜间模式
3. 文章代码排版。

# :art:演示
[tonychenn.cn](https://tonychenn.cn) 觉得不错，点个Star

# :pushpin:介绍
1. 响应式布局，适配移动端和PC端
2. 优美MaterialDesign设计
3. 轻巧极速加载
# 实现的功能
1. 基本的博客展示，首页，标签页，归档页，关于页
2. 一言随机内容展示
3. 使用Valine文章评论，新增Gitalk
4. 开启访问人数，次数统计
5. 视频博文的展示播放
6. 全局灰色模式，白天/夜晚模式

# :computer:PC端

![](https://raw.githubusercontent.com/TonyChenn/BlogPicture/master/2019/0406/img1.jpg)
![](https://raw.githubusercontent.com/TonyChenn/BlogPicture/master/2019/0406/img2.jpg)
![](https://raw.githubusercontent.com/TonyChenn/BlogPicture/master/2019/0406/about.jpg)

# :iphone:移动端

![](https://raw.githubusercontent.com/TonyChenn/BlogPicture/master/2019/0406/phone_main.jpg)
![](https://raw.githubusercontent.com/TonyChenn/BlogPicture/master/2019/0406/phone_tag.jpg)
![](https://raw.githubusercontent.com/TonyChenn/BlogPicture/master/2019/0406/phone_archives.jpg)

# 案例
本博客使用mdm主题，更多细节，自行查看[TonyChenn.cn](Tonychenn.cn)

# :cd:安装

## 下载
```bash
$ git clone https://github.com/TonyChenn/hexo-theme-mdm
```

## 更新
```bash
$ cd themes/mdm
$ git pull
```

## 开启站点地图模块
1. 安装sitemap
```bash
//google
$ npm install hexo-generator-sitemap --save

//baidu
$ npm install hexo-generator-baidu-sitemap --save
```
2. 配置sitemap
主题根目录下_config.yml文件中启用下面
```
# 站点地图
sitemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```
3. 重新生成部署
```bash
$ hexo clean && hexo g && hexo s
```

## 开启Emoji表情支持
1. 需要卸载旧的渲染器 & 安装新的渲染器
```bash
$ npm un hexo-renderer-marked --save 
$ npm i hexo-renderer-markdown-it --save
$ npm install markdown-it-emoji --save
```
2. heox配置文件中添加
``` bash
# Markdown-it config
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-abbr
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-emoji
  anchors:
    level: 2
    collisionSuffix: 'v'
    permalink: true
    permalinkClass: header-anchor
    permalinkSymbol: ¶
```
## 文章置顶及自定义排序
请到Hexo项目下的<kbd>\node_modules\hexo-generator-index\lib\generator.js</kbd>找到该文件并打开。(js代码简单，不过多介绍，有需要修改的自行修改) 替换为如下内容：
```js
'use strict';

var pagination = require('hexo-pagination');
module.exports = function(locals) {

  var config = this.config;
  var posts = locals.posts;
  var paginationDir = config.pagination_dir || 'page';

  posts.data = posts.data.sort(function(a, b) {
      var a_time = (a.update_time && a.update_time>a.date) ? a.update_time : a.date;
      var b_time = (b.update_time && b.update_time>b.date) ? b.update_time : b.date;
      
      if(a.top && b.top)  return a.top == b.top ? b_time-a_time: b.top-a.top;

      else if(a.top)  return -1;
      else if(b.top)  return 1;

      else return b_time - a_time;
  });


  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
```

## 开启PWA
待补充

## hexo升级4.2.0后PWA失效
参考[https://github.com/hexojs/hexo/issues/4044](https://github.com/hexojs/hexo/issues/4044)
在hexo-pwa插件没修复之前解决方案：打开`\node_modules\hexo-pwa\lib\serviceWorker.js` 修改下面内容：
```js
- let posts = this.locals.cache.posts.data;
+ let posts = locals.posts.sort('-date').toArray();
```

# 下载
Github: https://github.com/TonyChenn/hexo-theme-mdm
觉得不错？点个小星星给我个鼓励吧 (*_*)
![](https://cdn.jsdelivr.net/gh/TonyChenn/BlogPicture/2019/0406/star.jpg)
