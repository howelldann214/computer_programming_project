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

// 未登入時，跳轉到登入頁面並顯示提示
function redirectToLogin() {
    alert('請先登入');
    window.location.href = '../login/login.html';
}

// 頁面載入後檢查登入狀態
document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = checkLogin();  // 檢查用戶是否登入
    const topRight = document.querySelector('.top-right');

    if (isLoggedIn) {
        // 如果已登入，顯示用戶名稱
        const username = localStorage.getItem('username');
        topRight.innerHTML = `
            <ul>
                <li><span>${username}</span></li>
            </ul>
        `;
    } else {
        // 如果未登入，跳轉到登入頁面並顯示提示
        redirectToLogin();
    }
});
