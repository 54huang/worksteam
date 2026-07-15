## Context

项目为个人简历网站，当前处于初始化阶段。需要一个入口页面展示个人信息，作为后续简历内容的导航入口。采用纯原生 HTML/CSS/JS 实现，无框架依赖，部署简单。

## Goals / Non-Goals

**Goals:**
- 提供居中布局的圆角矩形简介卡片
- 卡片内包含头像、邮箱（点击复制到剪贴板）、GitHub 外链、个人简介文字
- 响应式设计，适配桌面端和移动端
- 纯静态页面，可直接在浏览器打开

**Non-Goals:**
- 不涉及后端服务或数据库
- 不包含国际化（仅中文）
- 不包含动画效果或复杂交互
- 不涉及构建工具（Webpack、Vite 等）

## Decisions

1. **纯原生实现 vs 框架**
   - 选择原生 HTML/CSS/JS。项目处于初始化阶段，无构建工具链，原生实现零依赖、即时可用。

2. **Flexbox 居中布局**
   - 使用 Flexbox 实现水平和垂直居中，兼容性好，代码简洁。备选 Grid 方案同样可行，但 Flexbox 对于单元素居中场景更直观。

3. **Clipboard API 实现邮箱复制**
   - 使用 `navigator.clipboard.writeText()` 实现复制，现代浏览器均支持。降级方案：不提供 `document.execCommand` 回退，因该 API 已废弃。

4. **CSS 变量管理主题色**
   - 使用 CSS 自定义属性管理颜色，便于后续调整主题。

5. **文件拆分（HTML/CSS/JS 分离）**
   - 三个独立文件，职责清晰，便于维护。

## Risks / Trade-offs

- [浏览器兼容性] Clipboard API 在非 HTTPS 环境下不可用 → 开发环境使用 `localhost` 可正常使用；部署时使用 HTTPS
- [移动端适配] 小屏设备卡片可能过宽 → 使用 `max-width` + 百分比宽度确保在 320px 宽屏幕上正常显示
