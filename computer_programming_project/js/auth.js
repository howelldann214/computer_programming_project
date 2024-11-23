// auth.js

// 模擬登入（假設成功登入後，設定登入狀態）
function login(username) {
    // 保存登入狀態在 LocalStorage 中
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username);
    // 重定向至主頁面
    window.location.href = '../main/main.html';
}

// 模擬登出
function logout() {
    // 移除登入狀態
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // 重定向至登入頁面
    window.location.href = '../login/login.html';
}

// 檢查是否已登入
function checkLogin() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 未登入時，跳轉到登入頁面
function redirectToLogin() {
    alert('請先登入');
    window.location.href = '../login/login.html';
}
