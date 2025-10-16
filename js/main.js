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

//JS 动态主题切换
function setThemeBackground(imageUrl, themeColor = '#000000', isLight = false) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
  document.body.classList.toggle('light', isLight);
}


window.goHome = function() {
  appContainer.innerHTML = "";
  appContainer.style.display = "none";
  home.style.display = "flex";
};

// === 主题切换逻辑 ===
const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

function setThemeBackground(imageUrl, themeColor = '#000000', isLightMode = false) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
  document.body.classList.toggle('light', isLightMode);
}

function toggleTheme() {
  isLight = !isLight;
  if (isLight) {
    setThemeBackground('assets/bg/day.jpg', '#f4f4f4', true);
    themeToggle.textContent = '🌞';
  } else {
    setThemeBackground('assets/bg/night.jpg', '#000000', false);
    themeToggle.textContent = '🌙';
  }
}

// 默认夜间主题
setThemeBackground('assets/bg/night.jpg', '#000000', false);
themeToggle.addEventListener('click', toggleTheme);
