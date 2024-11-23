// signup.js

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

    // 驗證密碼長度和複雜度
    if (!validateLength(password)) {
        alert("密碼需至少包含 8 位字符");
        return;
    }

    if (!validateComplexity(password)) {
        alert("密碼必須包含大小寫字母和數字");
        return;
    }

    // 密碼確認
    if (password !== confirmPassword) {
        alert('密碼不一致，請重新確認');
        return;
    }

    // 儲存註冊資料到 localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // 顯示註冊成功訊息
    alert('註冊成功！');

    // 跳轉到 login.html
    window.location.href = '../login/login.html';
}

// 綁定表單提交事件
document.getElementById('signupForm').addEventListener('submit', handleSignup);

// 密碼長度驗證
function validateLength(password) {
    return password.length >= 8;
}

// 密碼複雜度驗證
function validateComplexity(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumber;
}

// 即時顯示密碼提示
function checkPasswordInput() {
    const password = document.getElementById("password").value;
    const hintElement = document.getElementById("password-hint");

    if (!validateLength(password)) {
        hintElement.textContent = "密碼需至少包含 8 位字符";
        hintElement.style.color = "red";
        hintElement.style.display = "block";
    } else if (!validateComplexity(password)) {
        hintElement.textContent = "密碼必須包含大小寫字母和數字";
        hintElement.style.color = "red";
        hintElement.style.display = "block";
    } else {
        hintElement.textContent = "";
        hintElement.style.display = "none";
    }
}

// 即時顯示確認密碼提示
function checkPasswordConfirm() {
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("confirm-password").value;
    const hintElement = document.getElementById("confirm-password-hint");

    if (password !== passwordConfirm) {
        hintElement.textContent = "密碼不一致";
        hintElement.style.color = "red";
        hintElement.style.display = "block";
    } else {
        hintElement.textContent = "";
        hintElement.style.display = "none";
    }
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
