/**
 * 个人名片页面校验脚本
 * 运行方式：node check.js
 * 全部通过返回 0，任意失败返回 1
 */

var fs = require('fs');
var passed = 0;
var failed = 0;

function pass(msg) {
  passed++;
  console.log('  \x1b[32m\u2713\x1b[0m ' + msg);
}

function fail(msg) {
  failed++;
  console.log('  \x1b[31m\u2717\x1b[0m ' + msg);
}

function check(condition, msg) {
  if (condition) pass(msg); else fail(msg);
}

function fileContains(path, pattern, msg) {
  var content;
  try {
    content = fs.readFileSync(path, 'utf-8');
  } catch (e) {
    fail(path + ' \u4e0d\u5b58\u5728');
    return;
  }
  check(pattern.test(content), msg);
}

function fileNotContains(path, pattern, msg) {
  var content;
  try {
    content = fs.readFileSync(path, 'utf-8');
  } catch (e) {
    fail(path + ' \u4e0d\u5b58\u5728');
    return;
  }
  check(!pattern.test(content), msg);
}

function fileExists(path, msg) {
  check(fs.existsSync(path), msg);
}

console.log('\n=== HTML \u7ed3\u6784\u6821\u9a8c ===');

fileContains('index.html', /class="profile-card__header"/, 'index.html \u5b58\u5728 .profile-card__header');
fileContains('index.html', /class="profile-card__skills"/, 'index.html \u5b58\u5728 .profile-card__skills');
fileContains('index.html', /class="profile-card__divider"/, 'index.html \u5b58\u5728 .profile-card__divider');
fileContains('index.html', /aria-label="\u5207\u6362\u6df1\u8272\/\u6d45\u8272\u6a21\u5f0f"/, '\u4e3b\u9898\u5207\u6362\u6309\u94ae\u6709 aria-label');

console.log('\n=== CSS \u5b8c\u6574\u6027\u6821\u9a8c ===');

fileContains('styles.css', /\[data-theme="dark"\]/, 'styles.css \u5b58\u5728 [data-theme="dark"] \u9009\u62e9\u5668');
fileContains('styles.css', /profile-card__skill-tag--expanded/, 'styles.css \u5b58\u5728 .profile-card__skill-tag--expanded');
fileContains('styles.css', /profile-card__tagline/, 'styles.css \u5b58\u5728 .profile-card__tagline');
fileContains('styles.css', /profile-card__title/, 'styles.css \u5b58\u5728 .profile-card__title');

console.log('\n=== JS \u80fd\u529b\u6821\u9a8c ===');

var jsContent;
try {
  jsContent = fs.readFileSync('main.js', 'utf-8');
} catch (e) {
  fail('main.js \u4e0d\u5b58\u5728');
  jsContent = '';
}

check(/SKILLS\s*=/.test(jsContent), 'main.js \u5b9a\u4e49\u4e86 SKILLS \u6570\u7ec4');

var skillsMatch = jsContent.match(/SKILLS\s*=\s*\[([\s\S]*?)\]/);
if (skillsMatch) {
  var items = skillsMatch[1].match(/"([^"]+)"/g);
  var count = items ? items.length : 0;
  check(count <= 8, 'SKILLS \u6570\u7ec4\u957f\u5ea6 ' + count + ' \u2264 8');
} else {
  fail('\u65e0\u6cd5\u89e3\u6790 SKILLS \u6570\u7ec4');
}

check(/function renderSkills/, jsContent, 'main.js \u5b9a\u4e49\u4e86 renderSkills');
check(/function initThemeToggle/, jsContent, 'main.js \u5b9a\u4e49\u4e86 initThemeToggle');
check(/profile-theme/, jsContent, 'main.js \u4f7f\u7528 profile-theme \u952e\u540d');
check(/setAttribute\('data-skill'/, jsContent, 'renderSkills \u8bbe\u7f6e data-skill \u5c5e\u6027');
check(/SKILLS\.length/, jsContent, 'SKILLS \u5f15\u7528\u65f6\u68c0\u67e5\u4e86 length');
check(/}, 1000\)/, jsContent, 'main.js toast 时长为 1000ms');
fileContains('index.html', /class="profile-card__email-icon"/, 'index.html 存在 .profile-card__email-icon');

console.log('\n=== \u603b\u8ba1 ===');
console.log('  \u901a\u8fc7: ' + passed + '  \u5931\u8d25: ' + failed);

if (failed > 0) {
  console.log('\n\u274c ' + failed + ' \u9879\u6821\u9a8c\u672a\u901a\u8fc7');
  process.exit(1);
} else {
  console.log('\n\u2705 \u5168\u90e8 ' + passed + ' \u9879\u6821\u9a8c\u901a\u8fc7\n');
  process.exit(0);
}
