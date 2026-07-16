## 1. HTML 调整

- [x] 1.1 将邮箱 `<span role="button">` 改为 `<button class="profile-card__email">`，保留 `data-copy` 和 `aria-label`
- [x] 1.2 在按钮内添加信封 SVG 图标（`stroke` 风格，与 GitHub 图标一致）
- [x] 1.3 保持邮箱文字在图标右侧

## 2. CSS 样式更新

- [x] 2.1 重写 `.profile-card__email` 为 `inline-flex` 圆角矩形容器（`padding: 8px 20px`、`border`、`border-radius: 8px`），与 GitHub 按钮对齐
- [x] 2.2 重置 button 默认样式（`font-family` 继承、`background: none`）
- [x] 2.3 添加 `.profile-card__email:hover`，背景色或边框变化
- [x] 2.4 添加 `.profile-card__email:active`，`transform: scale(0.96)` 按压反馈
- [x] 2.5 添加 `.profile-card__email-icon` 样式（`flex-shrink: 0`、尺寸）
- [x] 2.6 调整移动端 `.profile-card__contact` 中邮箱按钮居中对齐

## 3. JS Toast 时长调整

- [x] 3.1 将 `showToast` 中 `setTimeout` 从 `2000` 改为 `1000`

## 4. 校验同步

- [x] 4.1 在 `check.js` 中追加：`main.js` toast 时长为 1000ms 的断言
- [x] 4.2 在 `check.js` 中追加：`index.html` 存在 `.profile-card__email-icon` 的断言

## 5. 验证

- [x] 5.1 检查邮箱显示为圆角矩形 + 信封图标 + 文字，视觉与 GitHub 按钮协调
- [x] 5.2 点击邮箱→ 复制成功 → toast 弹窗 1 秒内消失
- [x] 5.3 移动端邮箱按钮居中，图标文字不换行
- [x] 5.4 深色模式下邮箱按钮颜色正常
- [x] 5.5 `node check.js` 全部通过
