## Why

当前邮箱在卡片底部以纯文字链接形式展示，视觉上不醒目；复制成功后的 toast 提示停留 2 秒偏长。需要优化为带邮箱图标的圆角矩形按钮样式 + 缩短 toast 至 1 秒消失。

## What Changes

- **邮箱样式**：将邮箱文字从裸链接改为圆角矩形容器，左侧加入信封图标，文字居中
- **Toast 时长**：复制成功提示从 2 秒缩短为 1 秒，弹出后更快消失
- **样式一致性**：邮箱容器与 GitHub 按钮保持视觉协调（相同的圆角、边框、hover 效果、点击按压反馈）

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `profile-card`: 邮箱展示样式从纯文字链接改为带图标的圆角矩形；toast 消失时长从 2 秒缩短为 1 秒

## Impact

- 修改 `index.html`：新增信封 SVG 图标，将邮箱 `<span>` 包裹在 `<button>` 或保持 `<span>` 语义
- 修改 `styles.css`：重写 `.profile-card__email` 样式为带图标的矩形容器，调整 `.toast` 动画时长
- 修改 `main.js`：将 toast setTimeout 从 2000ms 改为 1000ms
- 不影响头像、职位、技能标签、GitHub、主题切换等其他功能
