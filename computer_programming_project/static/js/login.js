document.getElementById('login-button').addEventListener('click', async function () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.message === "Login successful") {
        window.location.href = '/';
    } else {
        alert(data.error || '登入失敗');
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
