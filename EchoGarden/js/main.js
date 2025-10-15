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

window.goHome = function() {
  appContainer.innerHTML = "";
  appContainer.style.display = "none";
  home.style.display = "flex";
};
