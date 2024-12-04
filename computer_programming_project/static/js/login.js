// login.js

document.addEventListener('DOMContentLoaded', function () {
    // 綁定登入按鈕點擊事件
    document.getElementById('login-button').addEventListener('click', function () {
        loginUser();
    });
});

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 從 localStorage 取得註冊時儲存的帳號和密碼
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password'); // 您可以選擇儲存密碼或是用後端處理

    // 檢查用戶輸入的帳號和密碼是否正確
    if (username === storedUsername && password === storedPassword) {
        // 登入成功，設置登入狀態
        localStorage.setItem('isLoggedIn', 'true'); // 儲存登入狀態

        // 顯示登入成功的提示
        alert('登入成功！歡迎 ' + username);

        // 跳轉到主頁面
        window.location.href = '../templates/main.html'; // 根據實際需要調整跳轉頁面
    } else {
        // 登入失敗
        alert('登入失敗，請檢查帳號或密碼');
    }
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.getElementById("toggle-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "隱藏";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "顯示";
    }
}

function showpw() {
    console.log(localStorage.getItem('username'));
    console.log(localStorage.getItem('password'));
}