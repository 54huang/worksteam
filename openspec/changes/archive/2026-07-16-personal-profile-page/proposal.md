## Why

需要一个个人简介网页作为简历网站的入口页面，展示核心个人信息并提供便捷的联系方式。正中放置简介卡片，直观展示头像、邮箱、GitHub 等关键信息，点击邮箱可一键复制，提升访客体验。

## What Changes

- 新增个人简介页面骨架（HTML/CSS/JS）
- 页面正中放置圆角矩形简介卡片
- 卡片包含：个人头像、邮箱信息（点击复制）、GitHub 链接、个人简介文字
- 页面居中布局，适配不同屏幕尺寸

## Capabilities

### New Capabilities
- `profile-card`: 个人简介卡片组件，居中展示头像、邮箱（点击复制）、GitHub 链接及个人信息

### Modified Capabilities
<!-- 无现有规格需要修改 -->

## Impact

- 新增 `index.html` 作为入口页面
- 新增 `styles.css` 样式文件
- 新增 `main.js` 交互逻辑（邮箱复制功能）
- 无外部依赖，纯原生 HTML/CSS/JS 实现
