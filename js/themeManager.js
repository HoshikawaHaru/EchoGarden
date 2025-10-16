// 🌈 Echo Garden 动态主题管理器
// 自动检测用户选择或系统主题，并动态更新浏览器与状态栏颜色

function setThemeColor(color, isLightMode = false) {
  // 更新 <meta name="theme-color">
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', color);
  
  // 更新 iOS 状态栏样式
  const statusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  if (statusMeta) {
    statusMeta.setAttribute('content', isLightMode ? 'default' : 'black-translucent');
  }
  
  // 更新虚拟状态栏文字颜色
  const statusBar = document.getElementById('status-bar');
  if (statusBar) {
    statusBar.style.color = isLightMode ? '#000' : '#fff';
  }
}

// 🪞 自动识别背景亮度
function updateThemeFromBackground() {
  const bodyBg = window.getComputedStyle(document.body).backgroundColor;
  const rgb = bodyBg.match(/\d+/g);
  if (!rgb) return;

  // 计算亮度（YIQ算法）
  const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  const isLight = brightness > 150;

  setThemeColor(bodyBg, isLight);
}

// 🌙 监听用户切换背景色的事件（或 CSS 变量）
window.addEventListener('themeChange', (e) => {
  const { color } = e.detail;
  const temp = document.createElement('div');
  temp.style.background = color;
  document.body.appendChild(temp);
  const rgb = window.getComputedStyle(temp).backgroundColor;
  temp.remove();
  const isLight = /rgb\((\d+),\s*(\d+),\s*(\d+)/.test(rgb) && RegExp.$1 * 0.299 + RegExp.$2 * 0.587 + RegExp.$3 * 0.114 > 150;
  setThemeColor(rgb, isLight);
});

// 🕊 初始执行一次
window.addEventListener('load', updateThemeFromBackground);
