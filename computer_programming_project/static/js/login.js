document.addEventListener('DOMContentLoaded', function () {
    // 綁定登入按鈕點擊事件
    document.getElementById('login-button').addEventListener('click', function () {
        loginUser();
    });
});

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 透過 fetch 向後端發送登入請求
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Login successful") {
            // 登入成功，跳轉到主頁面
            window.location.href = '/';  // 跳轉到主頁
        } else {
            // 登入失敗，顯示錯誤訊息
            alert(data.error || '登入失敗');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('登入時發生錯誤');
    });
}

// 顯示或隱藏密碼
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
