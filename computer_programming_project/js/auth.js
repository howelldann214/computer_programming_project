// auth.js

// 模擬登出
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
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
