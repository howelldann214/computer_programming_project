function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 簡單的驗證邏輯（這裡您可以設置測試帳號和密碼）
    if (username && password) { // 假設只要輸入不為空即視為有效
        // 保存登入狀態到 LocalStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);

        // 顯示登入成功的提示
        alert('登入成功！歡迎 ' + username);

        // 重定向至主頁面
        window.location.href = '../main/main.html';
    } else {
        // 錯誤提示
        alert('請輸入有效的帳號和密碼');
    }
}

function togglePassword() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}