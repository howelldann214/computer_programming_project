document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = checkLogin();
    const topRight = document.querySelector('.top-right');

    if (isLoggedIn) {
        // 如果已登入，顯示使用者名稱及登出按鈕
        const username = localStorage.getItem('username');
        topRight.innerHTML = `
            <ul>
                <li><span>歡迎, ${username}</span></li>
                <li><a href="#" onclick="logout()">登出</a></li>
            </ul>
        `;
    } else {
        // 未登入，顯示登入和註冊按鈕
        topRight.innerHTML = `
            <ul>
                <li><a href="../login/login.html">登入</a></li>
                <li><a href="../signup/signup.html">註冊</a></li>
            </ul>
        `;
    }
});