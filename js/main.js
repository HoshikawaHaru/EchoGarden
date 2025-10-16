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
