## 1. CSS 双主题变量与防闪烁

- [x] 1.1 在 `:root` 中扩展 CSS 变量，新增深色模式所需的所有变量（`--color-skill-bg`、`--color-skill-text` 等）
- [x] 1.2 添加 `[data-theme="dark"]` 选择器，定义深色模式下的变量覆盖值
- [x] 1.3 在 `<head>` 中内联防闪烁脚本：读取 `localStorage` 的 `profile-theme`，在 CSS 加载前设置 `<html data-theme>`
- [x] 1.4 为主题切换按钮新增 CSS 样式（`position: fixed` 右上角、圆形按钮、z-index、hover 效果）
- [x] 1.5 确保所有颜色使用 CSS 变量，主题切换时有 `transition` 平滑过渡
- [x] 1.6 预置 `.profile-card__skill-tag--expanded` 修饰类骨架，为后续触碰展开交互预留

## 2. HTML 结构重构

- [x] 2.1 调整 `.profile-card` 内部结构，新增 `.profile-card__header`（Flex 容器：头像 + 身份区）
- [x] 2.2 新增 `.profile-card__title` 显示职位（名字下方灰色小字）
- [x] 2.3 将原 `.profile-card__bio` 替换为 `.profile-card__tagline` 简短介绍
- [x] 2.4 新增 `.profile-card__skills` 空容器，供 JS 动态插入技能标签
- [x] 2.5 新增 `<hr class="profile-card__divider">` 分割线
- [x] 2.6 将 `.profile-card__contact`（邮箱 + GitHub）移至分割线下方
- [x] 2.7 在 `<body>` 顶部新增主题切换按钮，包含月亮（浅色模式）和太阳（深色模式）两个 SVG 图标

## 3. 桌面端 Flex 布局与响应式

- [x] 3.1 `.profile-card__header` 使用 `display: flex` 实现头像左 + 身份右分区
- [x] 3.2 `.profile-card__identity` 使用 `flex: 1` 占据剩余空间
- [x] 3.3 `.profile-card__tagline` 和 `.profile-card__skills` 块级元素占据整行
- [x] 3.4 `.profile-card__contact` 改为 `flex` 水平布局，`justify-content: space-between`
- [x] 3.5 媒体查询 `@media (max-width: 480px)` 中将 header 切为 `flex-direction: column`，contact 切为 `flex-direction: column`
- [x] 3.6 技能标签容器使用 `flex-wrap: wrap`，移动端缩小字号

## 4. JS 交互逻辑

- [x] 4.1 新增主题切换函数：点击按钮切换 `data-theme`，同时切换太阳/月亮图标的 `display`
- [x] 4.2 切换后将偏好写入 `localStorage`（键名 `profile-theme`）
- [x] 4.3 定义 `SKILLS` 数组（最多 8 个元素，如 `["JavaScript", "React", "Python", "Node.js", "Vue", "CSS"]`）
- [x] 4.4 实现 `renderSkills()` 函数：遍历数组前 8 项，创建 `span.profile-card__skill-tag`，设置 `data-skill` 属性，插入容器
- [x] 4.5 在 DOMContentLoaded 时调用 `renderSkills()` 和初始化主题按钮事件

## 5. 验证

- [x] 5.1 桌面端（>480px）：确认头像左对齐、名字/职位在右、标签正常、分割线+联系区左右分布
- [x] 5.2 移动端（<480px）：确认所有元素居中堆叠，内容不溢出
- [x] 5.3 浅色 ↔ 深色切换：点击按钮确认颜色平滑过渡，图标正确切换
- [x] 5.4 localStorage 持久化：切换后刷新页面，确认主题保持不变
- [x] 5.5 头像 fallback：删除或重命名 `avatar.jpg` 确认占位图正常显示
- [x] 5.6 邮箱复制功能正常，toast 提示正常
