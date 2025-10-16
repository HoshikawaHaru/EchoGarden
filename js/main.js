// ============ 修复 iOS 视口高度和黑边问题 ============
function fixViewportHeight() {
  // 获取真实的视口高度（包括底部导航栏区域）
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  
  // 直接设置元素高度，不使用 CSS 变量
  document.documentElement.style.height = `${vh}px`;
  document.body.style.height = `${vh}px`;
  
  const homescreen = document.getElementById('homescreen');
  if (homescreen) {
    homescreen.style.height = `${vh}px`;
  }
  
  const bgLayer = document.getElementById('bg-layer');
  if (bgLayer) {
    bgLayer.style.height = `${vh}px`;
    bgLayer.style.width = `${vw}px`;
  }
}

// 页面加载时立即执行
fixViewportHeight();

// 监听各种可能改变视口的事件
window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', () => {
  setTimeout(fixViewportHeight, 100); // 延迟执行，等待旋转完成
});

// iOS Safari 特殊处理：滚动时重新计算
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', fixViewportHeight);
  window.visualViewport.addEventListener('scroll', fixViewportHeight);
}

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

// ============ App 点击事件（示例） ============
document.querySelectorAll('.app-icon').forEach(icon => {
  icon.addEventListener('click', function() {
    const appName = this.dataset.app;
    console.log('打开应用:', appName);
    // 这里可以添加打开应用的逻辑
  });
});
