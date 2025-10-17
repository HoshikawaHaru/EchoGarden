// ========== 主页面：点击跳转消息页 ==========
const appMessage = document.getElementById('app-message');
if (appMessage) {
  appMessage.addEventListener('click', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = 'message.html';
    }, 300);
  });
}

// ========== 消息页：返回主页 ==========
const backHome = document.getElementById('back-home');
if (backHome) {
  backHome.addEventListener('click', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 300);
  });
}

// ========== 消息页：tab切换 ==========
const tabBtns = document.querySelectorAll('.tab-btn');
if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.tab-btn.active')?.classList.remove('active');
      document.querySelector('.tab.active')?.classList.remove('active');
      btn.classList.add('active');
      document.getElementById(btn.dataset.target).classList.add('active');
    });
  });
}
