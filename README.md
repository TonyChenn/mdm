# MDM

一款面向 Hexo 的 Material Design 博客主题，采用 MDUI 2 与 Material Design 3 组件，支持响应式布局、亮暗主题、文章置顶、无限滚动与基础 SEO。

- 演示站点：[blog.tonychenn.cn](https://blog.tonychenn.cn)
- 主题仓库：[TonyChenn/mdm](https://github.com/TonyChenn/mdm)

## 当前版本亮点

2026 年 9 月的主题同步更新包含：

- 升级至 MDUI 2，并使用 Material Design 3 动态配色
- 重构桌面导航和移动端抽屉导航
- 首页增加独立的置顶文章区域和自动加载下一页
- 优化文章卡片、标签、归档、关于页与 404 页的响应式布局
- 支持系统友好的亮暗主题切换，并记住用户选择
- 增加文章发布/更新时间、上一篇/下一篇与基于标签的相关推荐
- 增加 canonical、Open Graph、Twitter Card 和 `BlogPosting` 结构化数据
- 使用浏览器原生图片懒加载，并为加载失败的图片提供回退图
- 优化代码块折叠、语言标识和移动端阅读体验

## 功能

- 首页、文章、独立页面、标签、分类、归档和关于页
- 自适应桌面与移动端布局
- 可配置的 Material 主题种子色
- 文章置顶及自定义置顶顺序
- 视频文章卡片
- 图片预览、懒加载与错误回退
- Valine 或 Gitalk 评论
- 多平台分享与支付宝/微信打赏
- 全局灰色模式、点击爱心特效
- 百度自动推送与 Google AdSense 广告位
- 中文和英文界面文案

## 安装

在 Hexo 站点根目录执行：

```bash
git clone https://github.com/TonyChenn/mdm.git themes/mdm
```

然后在站点的 `_config.yml` 中启用主题：

```yaml
theme: mdm
```

最后重新生成站点：

```bash
npx hexo clean
npx hexo generate
npx hexo server
```

主题的默认配置位于 `themes/mdm/_config.yml`。建议将需要覆盖的配置写入站点根目录的 `_config.mdm.yml`，这样更新主题时更容易保留自己的设置。

> 默认配置包含演示站点的链接、图片、评论和广告参数。用于自己的站点前，请替换这些值；不使用的服务应将对应的 `enable` 设为 `false`。请勿提交真实的私密凭据。

## 页面配置

### 标签页

```bash
npx hexo new page tags
```

编辑 `source/tags/index.md`：

```yaml
---
title: 标签
type: tags
layout: tags
---
```

### 关于页

```bash
npx hexo new page about
```

编辑 `source/about/index.md`：

```yaml
---
title: 关于
type: about
layout: about
---
```

归档页由 Hexo 自动生成。分类页使用 Hexo 的分类路由；如需在顶部菜单显示分类，可在主题的 `menu` 中自行添加入口。

## 文章 Front-matter

```yaml
---
title: 示例文章
date: 2026-09-12 12:00:00
updated: 2026-09-12 18:00:00
tags:
  - Hexo
categories:
  - 前端
img: /images/example-cover.jpg
desc: 这段文字会显示在首页文章卡片中。
sticky: 10
---
```

主题使用的扩展字段如下：

| 字段 | 说明 |
| --- | --- |
| `img` | 文章头图和首页卡片封面；未设置时使用 `no_img` |
| `desc` | 首页文章卡片摘要，支持渲染 HTML |
| `sticky` | 非零值表示置顶；数值越大，置顶区排序越靠前 |
| `video` | MP4 地址；设置后首页使用视频文章卡片 |
| `updated` | 晚于发布日期时显示文章更新时间 |
| `description` | 优先作为页面 SEO 描述 |
| `noindex` | 设为 `true` 时输出 `noindex,follow` |

`sticky` 仅影响主题首页的展示，不需要修改 `hexo-generator-index` 或 `node_modules`。

## 常用主题配置

以下配置均位于主题 `_config.yml`，也可以在站点 `_config.mdm.yml` 中覆盖。

### 导航与外观

```yaml
menu:
  Home:
    url: /
    icon: home
    text: 首页
  About:
    url: /about/
    icon: info
    text: 关于

material:
  primary_color: "#6750A4"

index_header_img: /images/header.jpg
index_subtitle: 站点副标题
default_error_img: /images/fallback.jpg
no_img: /images/default-cover.jpg
```

`menu` 的键名可自定义。`icon` 使用 Material Symbols 图标名；`open_mode: _blank` 可让外部链接在新窗口打开。

### 相关推荐

```yaml
related_posts:
  enable: true
  limit: 4
```

相关推荐按共同标签数量和发布时间排序，最多显示 4 篇。

### 评论

Valine 和 Gitalk 可以分别配置：

```yaml
Valine:
  enable: false
  app_id: your-app-id
  app_key: your-app-key
  avatar: retro
  placeholder: 欢迎留言

Gitalk:
  enable: false
  githubID: your-github-name
  repo: your-comments-repo
  ClientID: your-client-id
  ClientSecret: your-client-secret
  adminUser: your-github-name
  proxy: your-oauth-proxy
```

如果只需要一种评论系统，请关闭另一种。Gitalk 的 OAuth 信息和代理地址必须替换为你自己的配置。

### 分享与打赏

```yaml
share:
  enable: true
  facebook: true
  qq: true
  twitter: true
  weibo: true
  telegram: true
  linkedin: true

reward:
  enable: false
  title: 请我喝杯咖啡？
  alipay: /images/alipay.jpg
  wechat: /images/wechat.jpg
```

### SEO、广告和页面效果

```yaml
SEO:
  BaiduAutoPush: false
  GoogleAd: false
  AggregateAdLimit: 3
  GreyMode: false

ClickEffect:
  enable: false
```

- `BaiduAutoPush`：加载百度链接自动推送脚本。
- `GoogleAd`：启用主题内置的 AdSense 脚本和广告位。启用前需要在模板中替换为自己的广告参数。
- `AggregateAdLimit`：标签页和归档页的广告位上限，主题会将其限制在 `0` 到 `3`。
- `GreyMode`：为全站启用灰色显示。

主题会根据站点标题、描述、作者、URL 和文章 Front-matter 自动生成主要 SEO 元信息。请先在站点根目录 `_config.yml` 中正确填写 `url`、`title`、`description` 和 `author`。

## 站点地图

站点地图由 Hexo 站点配置和生成器管理，不应写在主题配置中。

```bash
npm install --save hexo-generator-sitemap hexo-generator-baidu-sitemap
```

在站点根目录 `_config.yml` 中添加：

```yaml
sitemap:
  path: sitemap.xml

baidusitemap:
  path: baidusitemap.xml
```

## Emoji（可选）

如需 Markdown Emoji，可在站点根目录更换渲染器：

```bash
npm uninstall --save hexo-renderer-marked
npm install --save hexo-renderer-markdown-it markdown-it-emoji
```

然后按照所使用版本的 `hexo-renderer-markdown-it` 文档，在站点配置中启用 `markdown-it-emoji` 插件。

## 更新

如果主题目录没有本地修改：

```bash
cd themes/mdm
git pull --ff-only
```

更新前建议备份主题内的自定义修改。将覆盖项放在 `_config.mdm.yml` 可以减少配置冲突。

## 开发与检查

本仓库只包含主题。预览和生成命令应从 Hexo 站点根目录运行：

```bash
npm install
npm run server
npm run clean
npm run build
```

提交布局或样式改动前，请检查首页、文章、标签、分类、归档、关于和 404 页面，并覆盖桌面/移动端及亮色/暗色主题。

## 相关工具

- [HexoBlogWriteTool](https://github.com/TonyChenn/HexoBlogWriteTool)：Hexo 博文管理工具
- [BlogExportTool](https://github.com/TonyChenn/BlogExportTool)：CSDN 博文导出工具

如果这个主题对你有帮助，欢迎点一个 Star。
