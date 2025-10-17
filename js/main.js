// ============ 主题切换 ============
const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

// 改：把壁纸写到 <html> 的 CSS 变量上
function setThemeBackground(imageUrl, isLightMode = false) {
  const bgLayer = document.getElementById('bg-layer');
  const meta = document.querySelector('meta[name="theme-color"]');

  if (bgLayer) {
    bgLayer.src = imageUrl;  // ✅ 直接切换 <img> 的源文件
  }
  if (meta) meta.setAttribute('content', 'rgba(0,0,0,0)');
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
  // 使用 visualViewport.height 获取真实可见高度
  const viewport = window.visualViewport;
  const vh = (viewport ? viewport.height : window.innerHeight) * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // 同步给背景层高度
  const bg = document.getElementById('bg-layer');
  if (bg && viewport) {
    bg.style.height = viewport.height + 'px';
  }
}

fixViewportHeight();
window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', fixViewportHeight);
