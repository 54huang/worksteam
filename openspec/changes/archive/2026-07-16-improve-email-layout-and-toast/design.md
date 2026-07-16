## Context

当前邮箱展示为裸文字链接样式（蓝色文字，无边框），与 GitHub 按钮的圆角矩形容器视觉不协调。toast 提示停留 2 秒偏长，需缩短。改动仅涉及 `index.html`、`styles.css`、`main.js` 三个文件，不影响其他功能。

## Goals / Non-Goals

**Goals:**
- 邮箱区域改为带信封 SVG 图标的圆角矩形按钮样式，与 GitHub 按钮视觉统一
- Toast 消失时长从 2000ms 缩短为 1000ms
- 保持邮箱点击复制、键盘复制、降级行为不变

**Non-Goals:**
- 不改变 GitHub 按钮样式
- 不引入外部图标库
- 不改变 toast 位置和其他行为
- 不修改 CSP 策略

## Decisions

### 1. 邮箱容器结构：`<span>` 改 `<button>` + 内嵌 SVG

将邮箱从 `<span role="button">` 改为语义化的 `<button>` 元素，内部放信封 SVG 图标 + 文字：
```html
<button class="profile-card__email" data-copy="zhangsan@example.com">
  <svg class="profile-card__email-icon" ...>信封路径</svg>
  zhangsan@example.com
</button>
```
- 替代方案：保留 `<span>` + 伪元素 `::before` 放图标 → 伪元素图标无法设置 `stroke` 等属性，SVG 内联更灵活
- Button 语义更正确（可点击），且自带 `cursor: pointer` 和键盘支持

### 2. 信封图标：内联 SVG 16px Feathe 风格

使用与 GitHub 图标一致的 stroke 风格线条图标：
```html
<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
  <polyline points="22,6 12,13 2,6"/>
</svg>
```
- 替代方案：Unicode 字符 `✉` → 不同平台渲染不一致，SVG 可控

### 3. 邮箱样式：与 GitHub 按钮对齐

```css
.profile-card__email {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  /* 与 GitHub 按钮相同的 padding/border/radius */
}
```

### 4. 按压反馈：`:active` 伪类

点击/触碰邮箱按钮时通过 `:active` 实现视觉压缩反馈：
```css
.profile-card__email:active {
  transform: scale(0.96);
}
```
- 替代方案：`box-shadow: inset` → 缩进感不够自然，`scale` 更接近原生按钮手感
- 对 GitHub 按钮同样适用的通用做法

### 5. Toast 时长：2000ms → 1000ms

`main.js` 中 `setTimeout` 的延迟从 2000 改为 1000。

## Risks / Trade-offs

- [语义变更] `<span role="button">` 改为 `<button>` → 确保 CSS 重置 button 默认样式（字体继承、背景透明等）
- [宽度对齐] 邮箱按钮与 GitHub 按钮宽度不一致 → 不强制等宽，保持各自自然宽度，视觉上用 `gap` 居中分隔即可
