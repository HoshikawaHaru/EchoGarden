const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

function setThemeBackground(imageUrl, isLightMode = false) {
  document.body.style.transition = "background-image 0.5s ease";  // 添加渐变效果
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isLightMode ? '#ffffff' : '#000000');
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

// 初始化主题
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
setThemeBackground(prefersLight ? 'assets/bg/day.jpeg' : 'assets/bg/night.jpeg', prefersLight);
isLight = prefersLight;
themeToggle.textContent = prefersLight ? '🌞' : '🌙';

themeToggle.addEventListener('click', toggleTheme);

// === 修正 iOS Safari 灵动岛高度丢失问题 ===
function fixViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 初始化 & 监听窗口变化
fixViewportHeight();
window.addEventListener('resize', fixViewportHeight);
window.addEventListener('orientationchange', fixViewportHeight);
