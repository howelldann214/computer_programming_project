document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.message === "Registration successful") {
        alert('註冊成功！');
        window.location.href = '/login';
    } else {
        alert(data.error || '註冊失敗');
    }
});

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = '隱藏';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = '顯示';
    }
}

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
