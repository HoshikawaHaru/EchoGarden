// ============ 主题切换 ============
const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

function setThemeBackground(imageUrl, isLightMode = false) {
  const bgLayer = document.getElementById('bg-layer');
  const meta = document.querySelector('meta[name="theme-color"]');

  if (bgLayer) {
    bgLayer.src = imageUrl;
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

// ============ 修正 iOS 视口高度（增强版） ============
function fixViewportHeight() {
  // ✅ 优先使用 visualViewport，更准确
  const viewport = window.visualViewport || window;
  const height = viewport.height || window.innerHeight;
  const vh = height * 0.01;
  
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // ✅ 调试信息（可选，上线后删除）
  console.log('视口高度更新:', {
    innerHeight: window.innerHeight,
    visualHeight: viewport.height,
    vh: vh,
    safeBottom: getComputedStyle(document.documentElement).getPropertyValue('--safe-bottom')
  });
}

// ✅ 多事件监听，确保捕获所有高度变化
fixViewportHeight();
window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(fixViewportHeight, 100); // 延迟执行，等待旋转完成
});

// ✅ iOS 专用：监听 visualViewport 变化
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', fixViewportHeight);
  window.visualViewport.addEventListener('scroll', fixViewportHeight);
}

// ✅ 页面显示时重新计算（从后台切回）
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    setTimeout(fixViewportHeight, 50);
  }
});

// ============ 防止 iOS 橡皮筋效果（过度滚动） ============
document.addEventListener('touchmove', (e) => {
  const homescreen = document.getElementById('homescreen');
  // 如果是主屏，阻止默认滚动
  if (homescreen && homescreen.style.display !== 'none') {
    e.preventDefault();
  }
}, { passive: false });

// ============ 背景图片预加载（防止闪烁） ============
function preloadImage(url) {
  const img = new Image();
  img.src = url;
}

preloadImage('assets/bg/day.jpeg');
preloadImage('assets/bg/night.jpeg');

// ============ App 点击事件处理（示例） ============
document.querySelectorAll('.app-icon').forEach(icon => {
  icon.addEventListener('click', function() {
    const appName = this.dataset.app;
    console.log('打开应用:', appName);
    // 这里添加打开应用的逻辑
  });
});
