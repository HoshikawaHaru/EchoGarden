// 更新时间
function updateTime() {
  const now = new Date();
  document.getElementById('time').textContent =
    now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateTime, 1000);
updateTime();

// 页面切换逻辑
const home = document.getElementById("homescreen");
const appContainer = document.getElementById("app-container");

document.querySelectorAll(".app-icon").forEach(icon => {
  icon.addEventListener("click", async () => {
    const app = icon.dataset.app;
    home.style.display = "none";
    appContainer.style.display = "block";
    appContainer.innerHTML = `<p style="text-align:center;margin-top:30vh;">加载中...</p>`;
    try {
      const res = await fetch(`apps/${app}.html`);
      const html = await res.text();
      appContainer.innerHTML = html;
    } catch {
      appContainer.innerHTML = `<p>❌ 无法加载 ${app}.html</p>`;
    }
  });
});

// JS 动态主题切换
function setThemeBackground(imageUrl, themeColor = '#000000', isLightMode = false) {
  // 设置背景图片
  document.body.style.backgroundImage = `url(${imageUrl})`;

  // 更新 <meta name="theme-color">，确保状态栏透明
  document.querySelector('meta[name="theme-color"]').setAttribute('content', 'rgba(0,0,0,0)'); // 新增这一行

  // 更新页面背景颜色和亮度模式
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
  
  // 切换页面模式（浅色 / 深色）
  document.body.classList.toggle('light', isLightMode);

  // 更新 iOS 状态栏样式
  const statusMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  statusMeta.setAttribute('content', isLightMode ? 'default' : 'black-translucent');
}

window.goHome = function() {
  appContainer.innerHTML = "";
  appContainer.style.display = "none";
  home.style.display = "flex";
};

// === 主题切换逻辑 ===
const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

function toggleTheme() {
  isLight = !isLight;
  if (isLight) {
    setThemeBackground('/EchoGarden/assets/bg/day.jpeg', '#f4f4f4', true);
    themeToggle.textContent = '🌞';
  } else {
    setThemeBackground('/EchoGarden/assets/bg/night.jpeg', '#000000', false);
    themeToggle.textContent = '🌙';
  }
}

// 默认夜间主题
setThemeBackground('/EchoGarden/assets/bg/night.jpeg', '#000000', false);
themeToggle.addEventListener('click', toggleTheme);
