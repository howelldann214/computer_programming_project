// 模擬登出
function logout() {
    fetch('/logout', {  // 觸發後端登出路由
        method: 'POST', 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Logout successful") {
            // 清理前端資料並跳轉到登入頁面
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            window.location.href = '{{ url_for("login") }}';
        }
    })
    .catch(error => {
        console.error('Logout Error:', error);
    });
}

// 檢查是否已登入
function checkLogin() {
    return fetch('/check_login', {  // 向後端請求登入狀態
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.isLoggedIn;  // 根據後端返回的狀態
    })
    .catch(error => {
        console.error('Check Login Error:', error);
        return false;  // 若發生錯誤，認為用戶未登入
    });
}

// 未登入時，跳轉到登入頁面並顯示提示
function redirectToLogin() {
    alert('請先登入');
    window.location.href = '/login';;
}

// 頁面載入後檢查登入狀態
document.addEventListener('DOMContentLoaded', function () {
    checkLogin().then(isLoggedIn => {  // 檢查用戶是否登入
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
});
