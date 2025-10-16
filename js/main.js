// 页面切换
const home = document.getElementById("homescreen");
const appContainer = document.getElementById("app-container");
[cite_start]document.querySelectorAll(".app-icon").forEach(icon => { /* [cite: 19] */
  icon.addEventListener("click", async () => {
    const app = icon.dataset.app;
    home.style.display = "none";
    appContainer.style.display = "block";
    appContainer.innerHTML = `<p style="text-align:center;margin-top:30vh;">加载中...</p>`;
    try {
      const res = await fetch(`apps/${app}.html`);
      appContainer.innerHTML = await res.text();
    } catch {
      appContainer.innerHTML = `<p>❌ 无法加载 ${app}.html</p>`;
    }
  });
});
[cite_start]window.goHome = function() { /* [cite: 20] */
  appContainer.innerHTML = "";
  appContainer.style.display = "none";
  home.style.display = "flex";
};

// === 动态主题切换 ===
const themeToggle = document.getElementById('theme-toggle'); [cite_start]/* [cite: 21] */
let isLight = false;

[cite_start]function setThemeBackground(imageUrl, isLightMode = false) { /* [cite: 22] */
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', 'rgba(0,0,0,0)');
  document.body.classList.toggle('light', isLightMode); [cite_start]/* [cite: 22] */
}

function toggleTheme() {
  isLight = !isLight;
  if (isLight) {
    setThemeBackground('assets/bg/day.jpeg', true);
    themeToggle.textContent = '🌞'; [cite_start]/* [cite: 23] */
  } else {
    setThemeBackground('assets/bg/night.jpeg', false);
    themeToggle.textContent = '🌙'; [cite_start]/* [cite: 24] */
  }
}

// 默认主题根据系统外观自动匹配
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches; [cite_start]/* [cite: 25] */
setThemeBackground(prefersLight ? 'assets/bg/day.jpeg' : 'assets/bg/night.jpeg', prefersLight);
isLight = prefersLight;
themeToggle.textContent = prefersLight ? '🌞' : '🌙';

themeToggle.addEventListener('click', toggleTheme);
