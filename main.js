/**
 * 头像加载失败时的 SVG 占位图（data URI）
 * @constant {string}
 */
var AVATAR_FALLBACK_SVG =
  "data:image/svg+xml," +
  "%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E" +
  "%3Ccircle cx='50' cy='35' r='20' fill='%23ccc'/%3E" +
  "%3Cellipse cx='50' cy='80' rx='35' ry='15' fill='%23ccc'/%3E" +
  "%3C/svg%3E";

/**
 * 显示短暂提示消息，2 秒后自动消失
 * @param {string} message - 提示文本
 */
function showToast(message) {
  var toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('toast--visible');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function () {
    toast.classList.remove('toast--visible');
  }, 2000);
}

/**
 * 将邮箱地址复制到系统剪贴板
 * @param {string} email - 要复制的邮箱地址
 * @returns {Promise<void>}
 */
function copyEmail(email) {
  if (!navigator.clipboard) {
    console.warn('当前浏览器不支持 Clipboard API，请手动复制邮箱地址');
    return Promise.resolve();
  }
  return navigator.clipboard.writeText(email).then(function () {
    showToast('已复制');
  }).catch(function (err) {
    console.warn('复制失败: ' + err.message);
  });
}

/**
 * 处理头像图片加载失败，替换为 SVG 占位图
 * @param {HTMLImageElement} img - 头像 img 元素
 */
function handleAvatarError(img) {
  img.onerror = null;
  img.src = AVATAR_FALLBACK_SVG;
}

/**
 * 初始化邮箱点击/键盘复制交互
 * @param {HTMLElement} emailEl - 邮箱元素
 */
function initEmailCopy(emailEl) {
  var email = emailEl.getAttribute('data-copy');
  if (!email) return;

  emailEl.addEventListener('click', function () {
    copyEmail(email);
  });

  emailEl.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      copyEmail(email);
    }
  });
}

(function () {
  var emailEl = document.querySelector('.profile-card__email[data-copy]');
  var avatarEl = document.querySelector('.profile-card__avatar');

  if (emailEl) {
    initEmailCopy(emailEl);
  }

  if (avatarEl) {
    avatarEl.addEventListener('error', function () {
      handleAvatarError(avatarEl);
    });
  }
})();
