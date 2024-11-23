// signup.js

// 假設儲存註冊資料的陣列（這裡為測試使用，實際情況應該儲存到資料庫或後端伺服器）
let users = [];

// 註冊表單提交的處理函式
function handleSignup(event) {
    event.preventDefault(); // 防止表單自動提交，讓我們手動控制

    // 取得表單資料
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // 簡單驗證（可依需求擴充）
    if (!username || !password || !confirmPassword) {
        alert('請填寫完整的註冊資料');
        return;
    }

    // 密碼確認
    if (password !== confirmPassword) {
        alert('密碼不一致，請重新確認');
        return;
    }

    // 儲存註冊資料（僅儲存一筆測試資料）
    users.push({ username, password });

    // 顯示註冊成功訊息
    alert('註冊成功！');

    // 跳轉到 login.html
    window.location.href = '../login/login.html';
}

// 綁定表單提交事件
document.getElementById('signupForm').addEventListener('submit', handleSignup);
