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

window.goHome = function() {
  appContainer.innerHTML = "";
  appContainer.style.display = "none";
  home.style.display = "flex";
};

// === 动态主题切换 ===
const themeToggle = document.getElementById('theme-toggle');
let isLight = false;

function setThemeBackground(imageUrl, isLightMode = false) {
  // 设置壁纸
  document.body.style.backgroundImage = `url(${imageUrl})`;

  // 状态栏透明化
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  themeMeta.setAttribute('content', 'rgba(0,0,0,0)');

  // 切换浅/深模式
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

// 默认夜间主题
setThemeBackground('assets/bg/night.jpeg', false);
themeToggle.addEventListener('click', toggleTheme);
