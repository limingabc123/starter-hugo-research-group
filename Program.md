# UNIC 研究组网站 —— 项目架构

> 基于源码目录。

---

## 一、总体架构（总）

本项目是 **西安电子科技大学 泛在网络与智能计算研究组（UNIC Lab）** 的官方网站，基于 **Hugo 静态站点生成器** 与 **Wowchemy Research Group 主题模板**（Hugo Module 方式引入）二次开发而成。

### 1.1 技术栈

| 技术 | 说明 |
| --- | --- |
| Hugo | 静态站点生成器，`netlify.toml` 指定版本 `0.97.3` |
| Wowchemy v5 | 基于 Hugo Modules 的可视化「页面构建器」主题 |
| Go Modules | 依赖管理（`go.mod` 引入 Wowchemy 各模块） |
| Netlify | 部署平台（`netlify.toml` 配置构建与发布） |
| Netlify CMS | 可视化内容管理（`wowchemy-plugin-netlify-cms`） |
| YAML frontmatter | 所有内容的元数据格式 |

### 1.2 核心机制：Widget 页面构建器

网站绝大多数页面采用 **`type: landing` + `sections` 区块** 的方式组织。每个 `sections` 项即一个 **block（组件）**，由主题的 `parse_block_v2.html` 解析并调用对应模板渲染。本项目用到的 block 有：

- `slider` / `slider2` —— 轮播图（首页 / 学生风采）
- `markdown` —— 自由 HTML/Markdown 内容块（研究方向 / 科研分享 / 科研实习 / 联系我们）
- `portfolio` —— 带标签筛选的作品/新闻网格（首页新闻）
- `collection` / `collection_work` —— 内容列表集合（科研成果）
- `people` —— 团队成员展示（科研团队）

### 1.3 顶层目录职责一览

| 目录 / 文件 | 职责 |
| --- | --- |
| `config/_default/` | 站点全局配置（导航、参数、语言、主题模块） |
| `content/` | 全部站点内容（Markdown + frontmatter + 素材文件） |
| `layouts/` | 自定义模板覆盖（页脚、区块、基模板等） |
| `assets/` | Hugo 资源管道处理的资源（图片、SCSS） |
| `static/` | 原始静态文件（直接发布，如上传目录、个人照片） |
| `go.mod` / `go.sum` | Go 模块依赖 |
| `netlify.toml` | Netlify 构建部署配置 |
| `theme.toml` | 主题元数据（名称、标签、功能） |
| `.github/` | GitHub CI 工作流 |

---

## 二、模块功能详解（分）

### 2.1 `config/_default/` —— 全局配置模块

| 文件 | 功能 |
| --- | --- |
| `config.yaml` | 站点标题、URL、语言、Hugo 模块导入（Netlify CMS / Netlify / Wowchemy）、URL 永久链接规则、taxonomy（tag/category/publication_type/author）、分页与输出格式 |
| `menus.yaml` | 顶部导航菜单：首页、新闻、科研成果、科研团队、学生风采、论文、科研实习、科研分享、联系我们 |
| `languages.yaml` | 语言设置（默认英文，中文语言包已注释备用） |
| `params.yaml` | 外观（主题 minimal）、SEO、页头导航、页脚版权、日期格式、代码高亮/数学公式开关、搜索、地图、CMS、论文引用样式（APA） |

### 2.2 `content/` —— 内容模块（核心）

按内容分区说明如下。

#### ① `tour/` —— 首页（Homepage）

- 文件：`tour/index.md`
- 作用：网站首页落地页。
- 结构：`type: landing`，三个区块依次为
  - `slider`：三大研究方向轮播（6G 与未来智能无线网络 / 空天地一体化 / 车联网与自动驾驶）；
  - `portfolio`：最新新闻（从 `post/` 读取，排除 `expired` 标签，按日期倒序展示 9 条）；
  - `collection`：最新科研成果（从 `work/` 读取 3 条，按 `content_id` 升序）。

#### ② `post/` —— 新闻动态

- 文件：`post/<新闻标题>/index.md`
- 作用：发布实验室新闻、获奖喜报、学术交流等动态。
- 特征：每个新闻一个独立目录，正文 Markdown，`<!--more-->` 之前作为摘要。
- 标签体系（`tags`）：`paper`、`forum`、`contest`、`report`、`news`、`people`、`expired` 等；首页会过滤 `expired` 标签的旧新闻。

#### ③ `publication/` —— 论文库

- 文件：`publication/<论文英文短标题>/index.md` + `cite.bib` + `<Title>.pdf`
- 作用：展示实验室学术论文（当前 43 篇），支持引用样式（APA）与下载 PDF。
- frontmatter 字段：`title`、`authors`、`date`、`doi`、`publishDate`、`publication_types`（0-8 数字编码，2=期刊、1=会议）、`publication`、`abstract`、`links`（IEEE 链接）、`url_pdf`（相对路径 `./xxx.pdf`）、`url_code` 等。

#### ④ `work/` —— 科研成果（课题）

- 文件：`work/<课题名>/index.md` + `featured.png/jpg`
- 作用：展示代表性科研课题，带封面图。
- frontmatter 字段：`title`、`date`、`content_id`（用于排序）、`tag: work`；正文为 HTML 描述，`<!--more-->` 截断。

#### ⑤ `authors/` —— 团队成员档案

- 文件：`authors/<【类型-年级】姓名>/_index.md`（共 72 人）
- 作用：存储每位成员（导师 / 博 / 硕 / 校友）的个人信息，供「科研团队」页展示，并作为作者标签关联论文。
- 命名规则：目录名前缀 `【导师】`、`【博-年份】`、`【硕-年份】`、`【校友-年份】`。
- frontmatter 字段：`title`、`first_name`、`last_name`、`role`、`organizations`、`social`、`email`、`user_groups`（Teacher / PHD Student / Master Student / Alumni）、`highlight_name`。

#### ⑥ `people/` —— 科研团队页

- 文件：`people/index.md`
- 作用：成员列表页，使用 `people` 区块，按 `user_groups` 分组、按 `last_name` 排序展示上述作者档案。

#### ⑦ `event/` —— 学生风采（轮播相册）

- 文件：`event/index.md` + `event/新建 文本文档.txt`（备用片段）
- 作用：以全屏轮播（`slider2`）展示团队活动照片（团建、年会、毕业聚餐、会议）。
- 结构：`slides` 数组中每条记录含 `title`、`content`、`align`、`background.image.filename`（图片位于 `assets/media/pic/`）。

#### ⑧ `research/` —— 研究方向

- 文件：`research/index.md` + `research/fangxiang/` 下的方向展板图与 PDF
- 作用：展示四大研究方向海报（知识驱动的无线网络资源调配、6G 全场景按需服务、空天地一体化、智能无线网络），并复用 `collection` 展示科研成果列表。

#### ⑨ `seminar/` —— 科研分享（组会，密码保护）

- 作用：组会分享材料索引页，带密码门禁。
- 组成：
  - `index.md`：落地页，内嵌一段 HTML/JS：输入密码（SHA256 校验哈希值 `ef271b64...`）后，通过 `read.js` 抓取远端 `seminar_list/content.txt` 并渲染表格；
  - `materials/`：按日期 `YYYYMMDD/` 分目录存放汇报 PPT/PDF 与 `_会议纪要.docx`；
  - `AI_materials/`：AI 研讨会专用材料；
  - `templates/`：生成表格 HTML 的模板片段（容器、表头、表行、按钮）；
  - `read.js` / `sha256.js` / `style.css`：前端抓取与鉴权脚本、样式。

#### ⑩ `seminar_list/content.txt` —— 组会记录数据源

- 作用：由脚本生成的完整 HTML 表格，含普通组会与 AI 研讨会两张大表；每行 = 汇报日期 + 汇报人 + 汇报主题 + PPT/Note 下载按钮。`seminar/index.md` 页面通过 JS 读取并注入显示。

#### ⑪ `internship/` —— 科研实习

- 文件：`internship/index.md` + `style.css`
- 作用：本科科研实习项目介绍、申请方式、历届实习生成果与去向（2019-2023 级）。

#### ⑫ `contact/` —— 联系我们 / 招生

- 文件：`contact/index.md`
- 作用：招生信息与联系邮箱展示。

#### ⑬ `admin/` —— Netlify CMS 配置

- 文件：`admin/index.md`
- 作用：`type: wowchemycms`，运行时自动生成 CMS 配置文件，供可视化后台编辑内容。

### 2.3 `layouts/` —— 自定义模板模块

| 文件 | 功能 |
| --- | --- |
| `_default/baseof.html` | 站点基础骨架（HTML head、导航、正文、页脚加载逻辑） |
| `partials/blocks/collection.html` | `collection` 区块模板：按条件过滤/排序/分页展示内容集合 |
| `partials/blocks/collection_work.html` | 科研成果专用集合区块（自定义变体，含分隔线） |
| `partials/blocks/slider2.html` | 自定义轮播区块（学生风采页使用，支持全屏、自适应字号） |
| `partials/functions/get_page_title.html` | 页面标题获取辅助函数 |
| `partials/functions/parse_block_v2.html` | landing 页区块解析器（将 `sections` 映射到具体 block 模板） |
| `partials/site_footer.html` | 自定义页脚（版权、地址信息） |

### 2.4 `assets/` —— 资源模块

| 路径 | 功能 |
| --- | --- |
| `media/` | 图片资源：站点 logo（`logo.png`、`unic_logo_black_char.png`）、首页轮播背景（`ai.png`、`coders.jpg`、`iov.png`）、`pic/`（学生风采相册图）、`albums/`（方向相册）、`welcome.jpg`、`guanying.jpg` 等 |
| `scss/template.scss` | 自定义样式（标题居中、CTA 按钮居中） |
| `scss/custom.scss` | 额外自定义样式 |

### 2.5 `static/` —— 静态文件模块

| 路径 | 功能 |
| --- | --- |
| `uploads/` | CMS 上传目录（当前为空） |
| `files/` | 成员个人照片（如 `whd.jpg`、`zdy.jpg`） |

---

## 三、当前已有上传格式（分）

> 「上传」在静态站语境下 = 在对应目录新建 Markdown + 素材文件。以下为各分区新增内容的格式规范。

### 3.1 新闻（post）

- **路径**：`content/post/<新闻标题>/index.md`
- **frontmatter 模板**：

```yaml
---
title: 新闻标题
date: 2025-05-24
tags:
  - paper        # 可选：paper / forum / contest / report / news / people / expired
---
新闻正文（支持 Markdown / HTML）
<!--more-->
（more 之后为正文剩余部分）
```

- 注意：`expired` 标签的新闻不会出现在首页，但仍在 `/post/` 列表内。

### 3.2 论文（publication）

- **路径**：`content/publication/<英文短标题>/index.md`
- **同目录文件**：`cite.bib`、`<论文名>.pdf`
- **frontmatter 模板**：

```yaml
---
title: '论文全称（用单引号包裹，含特殊符号需转义）'
authors:
  - Author1
  - Author2
date: '2024-11-22T00:00:00Z'
doi: '10.xxxx/xxxx'
publishDate: '2024-11-22T00:00:00Z'
publication_types: ['2']   # 0未分类 1会议 2期刊 3预印本 4报告 5书 6书章节 7学位论文 8专利
publication: '期刊/会议全称'
publication_short: ''
abstract: 论文摘要
summary:
tags:
featured: false
links:
  - name: IEEE Link
    url: https://ieeexplore.ieee.org/document/xxxx
url_pdf: './RadioDiff.pdf'   # 相对同目录 PDF 路径
url_code: ''
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''
image:
  caption:
  focal_point: ''
  preview_only: false
---
```

### 3.3 科研成果（work）

- **路径**：`content/work/<课题名>/index.md` + `featured.png|jpg`
- **frontmatter 模板**：

```yaml
---
title: 课题名称
date: 2021-05-12
content_id: 5        # 用于排序（越小越靠前）
tag:
  - work
---
<div style="...">课题描述 HTML</div>
<!--more-->
```

### 3.4 团队成员（authors）

- **路径**：`content/authors/<【类型-年级】姓名>/_index.md`
- **frontmatter 模板**：

```yaml
---
title: 姓名
first_name: 姓
last_name: 名（可用作排序键）
superuser: false
role: 2024级硕士研究生<br>智能网络
organizations:
  - name: Xidian University
    url: ''
social:
  - icon: envelope
    icon_pack: fas
    link: 'mailto:xxx@stu.xidian.edu.cn'
  - icon: google-scholar
    icon_pack: ai
    link: https://scholar.google.com/...
email: 'xxx@stu.xidian.edu.cn'
highlight_name: false
user_groups:
  - Master Student   # Teacher / PHD Student / Master Student / Undergraduate Student / Alumni
---
```

### 3.5 学生风采（event 轮播图）

- **路径**：`content/event/index.md`（追加 `slides` 数组项）
- **格式**：图片放置于 `assets/media/pic/`，在 frontmatter 中引用：

```yaml
- title: 活动标题
  content:
  align: left
  background:
    image:
      filename: "pic/2023观影.png"
      filters:
        brightness: 1
    position: center
    color: '#fff'
    fit: cover
```

### 3.6 科研分享（seminar 组会）

分两步：

1. **上传材料**：将汇报 PPT/PDF 与 `_会议纪要.docx` 放入
   `content/seminar/materials/<YYYYMMDD>/`（AI 研讨会放入 `AI_materials/`）；
2. **更新索引**：在 `content/seminar_list/content.txt` 中按模板新增一行表格记录（日期 / 汇报人 / 主题 / PPT 与 Note 下载按钮）。模板见 `content/seminar/templates/`，页面通过密码门禁后由 JS 抓取该文件渲染。

### 3.7 研究方向 / 科研实习 / 联系我们

- 均为 `content/<分区>/index.md` 落地页，使用 `markdown` 区块，直接在 `text` 中写 HTML（表格、段落、内联样式），或将样式放入同名 `style.css`。
- 研究方向图片放在 `content/research/fangxiang/`。

---

## 四、构建与部署

- 本地预览：在项目根目录执行 `hugo server`。
- 生产构建：`hugo --gc --minify`（见 `netlify.toml`）。
- 部署平台：Netlify，支持 GitHub 分支预览；`netlify.toml` 允许 raw HTML 渲染（`markup.goldmark.renderer.unsafe = true`）。

---

## 五、快速定位速查表

| 想改什么 | 改哪里 |
| --- | --- |
| 导航菜单 | `config/_default/menus.yaml` |
| 网站标题/URL/模块 | `config/_default/config.yaml` |
| 外观/SEO/功能开关 | `config/_default/params.yaml` |
| 首页内容 | `content/tour/index.md` |
| 加一条新闻 | `content/post/<标题>/index.md` |
| 加一篇论文 | `content/publication/<短标题>/`（index.md + cite.bib + pdf） |
| 加一个课题 | `content/work/<课题名>/`（index.md + featured 图） |
| 加一名成员 | `content/authors/<【类型-年级】姓名>/_index.md` |
| 加一张风采照片 | `assets/media/pic/` + `content/event/index.md` |
| 加一次组会记录 | `content/seminar/materials/<日期>/` + `content/seminar_list/content.txt` |

---

## 六、内容上传与 GitHub 推送指南

### 6.1 两种上传方式总览

| 方式 | 适用场景 | 说明 |
| --- | --- | --- |
| **本地编辑 + Git 推送**（推荐） | 日常增删改内容、批量操作、传素材 | 在本机编辑文件 → `git commit` → `git push` → Netlify 自动构建部署 |
| **Netlify CMS 后台** | 在线快速改简单文本内容 | 访问 `https://<站点域名>/admin/` 登录后可视化编辑，改完由 CMS 自动提交 |

> 注意：Netlify CMS 适合改文字；**上传 PPT、PDF、图片等二进制素材，或新建整个内容目录**（如论文、组会材料），建议用「本地 + Git 推送」方式，避免后台上传受限。

### 6.2 方式一：本地编辑 + Git 推送

#### 6.2.1 首次准备（当前项目尚未初始化 Git 仓库）

1. **安装 Git**（Windows 下已装则跳过）。

2. **在 GitHub 创建远程仓库**（如 `unic-lab-website`），复制仓库地址
   （HTTPS 形如 `https://github.com/<用户名>/unic-lab-website.git`）。

3. **进入项目目录并初始化**：

   ```bash
   cd "项目根目录"   # 即 Program.md 所在目录
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **关联远程仓库并首次推送**：

   ```bash
   git branch -M main
   git remote add origin https://github.com/<用户名>/unic-lab-website.git
   git push -u origin main
   ```

5. **在 Netlify 关联该仓库**（New site from Git → 选仓库 → Build command 留空，
   由 `netlify.toml` 自动读取）。关联后每次 `push` 都会触发自动构建发布。

#### 6.2.2 日常上传内容流程

以「加一条新闻」为例，完整流程：

```bash
# 1) 创建新闻目录与文件（也可直接用编辑器新建）
mkdir "content/post/新的新闻标题"
#    在其中新建 index.md，按第三章节的 frontmatter 模板填写内容

# 2) 确认改动（可先用文件管理器/编辑器核对文件）
git status

# 3) 添加改动（可用 git add . 添加全部，或 git add 指定文件）
git add .

# 4) 提交（写清本次改了什么）
git commit -m "新增新闻：XXX"

# 5) 推送到 GitHub（触发 Netlify 自动部署）
git push
```

- 首次推送后，之后只需 `git add . → git commit -m "..." → git push` 三步。
- 推送前最好先本地预览确认无误：`hugo server` 后浏览器打开 `http://localhost:1313`。

#### 6.2.3 素材与图片上传要点

- **新闻正文图片**：放在 `assets/media/pic/`（或 `static/uploads/`），正文用相对路径引用。
- **论文 PDF**：放进对应论文目录 `content/publication/<短标题>/`，并在 `url_pdf` 写成 `./xxx.pdf`。
- **课题封面图**：`content/work/<课题名>/featured.png`。
- **学生风采照片**：`assets/media/pic/`，再在 `content/event/index.md` 的 `slides` 里加记录。
- **组会材料**：`content/seminar/materials/<日期>/`（PPT/PDF/会议纪要），并更新 `seminar_list/content.txt`。
- 文件名含**中文或空格**时，Git 命令中请用双引号包住路径。

### 6.3 方式二：Netlify CMS 后台

1. 部署后访问 `https://<站点域名>/admin/`（本地预览则是 `http://localhost:1313/admin/`）。
2. 登录（首次需在 Netlify 身份设置中开启 Identity + 邀请用户，配置见 `content/admin/index.md` 生成的 CMS 配置）。
3. 在后台选择对应内容类型编辑保存，CMS 会自动创建 commit 并推送，触发重新构建。

### 6.4 注意事项 / 常见问题

| 问题 | 处理 |
| --- | --- |
| `git push` 提示没有远程仓库 | 先执行 6.2.1 第 4 步的 `git remote add origin <地址>` |
| 推送被拒（远程已有提交） | 先 `git pull --rebase origin main` 再重新 `git push` |
| 不需要提交的文件 | `.gitignore` 已忽略 `public/`、`resources/`、`assets/jsconfig.json`，构建产物不要提交 |
| 改完看不到更新 | 检查 Netlify 是否构建成功（Deploys 面板），通常 1-2 分钟完成 |
| 提交信息规范 | 推荐 `feat:` / `fix:` / `docs:` 前缀，如 `feat: 新增论文 RadioDiff` |
