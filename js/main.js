// ============ 主题切换 ============
const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

// 改：把壁纸写到 <html> 的 CSS 变量上
function setThemeBackground(imageUrl, isLightMode = false) {
  document.documentElement.style.setProperty('--bg-image', `url(${imageUrl})`);
  // 透明主题色让状态栏背景不盖住壁纸
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute('content', 'rgba(0,0,0,0)');
  document.body.classList.toggle('light', isLightMode);
}

function toggleTheme() {
  isLight = !isLight;
  if (isLight) {
    setThemeBackground('assets/bg/day.jpeg', true);
    themeToggle.textContent = '🌞';
  } else {
    setThemeBackground('assets/bg/night.jpeg', false);
    themeToggle.textContent = '🌙';
  }
}

// 初始：跟随系统
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
setThemeBackground(prefersLight ? 'assets/bg/day.jpeg' : 'assets/bg/night.jpeg', prefersLight);
isLight = prefersLight;
themeToggle.textContent = prefersLight ? '🌞' : '🌙';
themeToggle.addEventListener('click', toggleTheme);

// ============ 修正 iOS 视口高度丢失（给内容容器用） ============
function fixViewportHeight() {
  const safeBottom = parseFloat(getComputedStyle(document.documentElement)
                      .getPropertyValue('--safe-bottom')) || 0;
  const vh = (window.innerHeight + safeBottom) * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
fixViewportHeight();
window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', fixViewportHeight);
