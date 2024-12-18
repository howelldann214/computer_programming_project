async function checkLogin() {
    try {
        const response = await fetch('/api/check_login', { method: 'GET' });
        const data = await response.json();
        return data; // 返回後端傳回的登入狀態與用戶名
    } catch (error) {
        console.error('Check Login Error:', error);
        return { isLoggedIn: false }; // 如果出錯，視為未登入
    }
}

// 更新頁面右上角的登入狀態
async function updateHeader() {
    const topRight = document.querySelector('.top-right');
    const loginStatus = await checkLogin();

    if (loginStatus.isLoggedIn) {
        // 已登入，顯示使用者名稱及登出按鈕
        topRight.innerHTML = `
            <ul>
                <li><span>${loginStatus.username}</span></li>
                <li><a href="#" id="logout-btn">登出</a></li>
            </ul>
        `;
        document.getElementById('logout-btn').addEventListener('click', logout);
    } else {
        // 未登入，顯示登入和註冊連結
        topRight.innerHTML = `
            <ul>
                <li><a href="/login">登入</a></li>
                <li><a href="/register">註冊</a></li>
            </ul>
        `;
    }
}

// 登出功能：呼叫後端 API 清除 Session
async function logout() {
    try {
        const response = await fetch('/logout', { method: 'POST' });
        const data = await response.json();
        if (data.message === 'Logout successful') {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Logout Error:', error);
        alert('登出失敗，請稍後再試');
    }
}

// 初始化頁面
document.addEventListener('DOMContentLoaded', updateHeader);
