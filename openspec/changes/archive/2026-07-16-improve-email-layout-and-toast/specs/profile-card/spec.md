## MODIFIED Requirements

### Requirement: 卡片展示邮箱信息并支持点击复制

系统 SHALL 在卡片中以圆角矩形容器展示邮箱地址，容器左侧显示信封图标，右侧显示邮箱文字。用户点击容器后 SHALL 将邮箱地址复制到系统剪贴板，并在页面顶部显示 toast 提示"已复制"，toast 在 1 秒内自动消失。

#### Scenario: 邮箱显示为圆角矩形带图标

- **WHEN** 页面加载完成
- **THEN** 邮箱地址以圆角矩形容器展示，左侧显示信封 SVG 图标，右侧显示邮箱文字

#### Scenario: 点击邮箱复制到剪贴板

- **WHEN** 用户点击邮箱容器
- **THEN** 邮箱地址被复制到系统剪贴板

#### Scenario: 复制成功后 1 秒内 toast 消失

- **WHEN** 邮箱地址成功复制到剪贴板
- **THEN** 页面顶部显示"已复制"toast，toast 在 1 秒内自动淡出消失

#### Scenario: 邮箱容器 hover 时有视觉反馈

- **WHEN** 用户将鼠标悬停在邮箱容器上
- **THEN** 容器背景色或边框发生变化，表明可点击

#### Scenario: 点击邮箱时有按压反馈

- **WHEN** 用户点击或触碰邮箱容器
- **THEN** 容器产生缩放缩小效果，松开后恢复原状

#### Scenario: 浏览器不支持 Clipboard API 时的降级行为

- **WHEN** 浏览器不支持 `navigator.clipboard`
- **THEN** 邮箱容器仍可正常显示，点击后静默无效果，不报错、不弹窗
