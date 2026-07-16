## Context

项目为纯原生 HTML/CSS/JS 个人名片页，当前只有一个居中堆叠布局的简单卡片。需要增强视觉效果和桌面端空间利用，同时保持零依赖、纯静态的实现方式。修改现有 `index.html`、`styles.css`、`main.js` 三个文件，CSP 策略无变化。

## Goals / Non-Goals

**Goals:**
- 桌面端采用头像左对齐 + 信息右侧的左右布局，移动端自动切换为居中堆叠
- 右上角太阳/月亮图标实现深色/浅色主题切换，localStorage 持久化
- 新增职位、技能标签（JS 数组动态渲染，最多 8 个）、简短 Tagline
- 联系信息（邮箱 + GitHub）移至卡片底部，用分割线隔开
- CSS 变量驱动双主题配色，切换时平滑过渡
- 保持现有功能不变：头像 fallback、邮箱复制、响应式适配

**Non-Goals:**
- 不引入任何外部依赖（框架、图标库、构建工具）
- 不修改 CSP 策略
- 不新增后端服务或数据库
- 不添加动画效果（仅 CSS transition 颜色过渡）

## Decisions

### 1. 桌面布局：CSS Grid 二维分区
使用 CSS Grid 实现桌面端头像 + 信息的左右分区：
```css
.profile-card { display: grid; grid-template-columns: auto 1fr; }
```
- 替代方案：Flexbox + `order` 属性 → 更复杂，Grid 更直观
- 移动端通过媒体查询切回 Flexbox 单列

### 2. 主题切换：`<html data-theme>` + CSS 变量
通过在 `<html>` 上设置 `data-theme` 属性，CSS 中用 `[data-theme="dark"]` 选择器覆盖变量：
```css
:root { --color-bg: #f0f2f5; ... }
[data-theme="dark"] { --color-bg: #1a1a2e; ... }
```
- 替代方案：`prefers-color-scheme` 媒体查询 → 无法手动切换
- 替代方案：class 切换 → 属性选择器语义更清晰
- 默认值：首次访问无 localStorage 时，默认浅色模式

### 3. 图标：内联 SVG（月亮/太阳）
不依赖外部图标库，直接在 HTML 中嵌入两个 SVG 图标，通过 `display` 控制显隐：
- 替代方案：单个 SVG 通过 JS 替换 path → 代码更复杂，两个图标切换更简单

### 4. 技能标签：JS 数组 + DOM 动态渲染
标签数据存储在 `main.js` 的数组中，页面加载时动态插入 DOM：
```js
var SKILLS = ["JavaScript", "React", "Python", "Node.js", "Vue", "CSS"];
```
- 替代方案：HTML 硬编码 → 不够灵活，但更简单；选择 JS 渲染便于后续扩展
- 扩展预留：每个标签元素添加 `data-skill` 属性，CSS 预设 `--expanded` 修饰类，为后续点击展开交互留好入口

### 5. localStorage 键名：`profile-theme`
使用命名空间前缀避免与其他项目冲突。值为 `"light"` 或 `"dark"`。

### 6. 主题切换按钮定位：`position: fixed` 右上角
固定在视口右上角，不随卡片滚动（虽然页面无滚动），z-index 高于卡片确保可点击。

## Risks / Trade-offs

- [浏览器兼容性] `localStorage` 在隐私模式/旧浏览器可能不可用 → 降级：读取失败时默认浅色，切换仍然生效但不持久化
- [FOUC（闪烁）] 深色偏好的用户刷新时可能先看到浅色再切换到深色 → 将主题检测脚本内联到 `<head>` 中，在 CSS 加载前执行
- [技能标签动态渲染] 如果 JS 加载失败，标签区域为空 → 不阻塞页面其他内容显示，属于非关键功能
- [CSP 限制] 现有 CSP `script-src 'self'; style-src 'self';` → 不引入内联脚本/样式，保持兼容

## Open Questions

- **[技能标签触碰展开]** 后期可能加入点击/悬浮展开技能详情的交互。当前预留：
  - 每个 `.profile-card__skill-tag` 渲染时附加 `data-skill="<名称>"` 属性
  - CSS 预置 `.profile-card__skill-tag--expanded` 修饰类骨架
  - 后续只需在 JS 中添加事件监听和展开内容，无需改动 HTML/CSS 结构
