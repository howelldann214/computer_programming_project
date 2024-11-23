function validateLength(password) {
  return password.length >= 8;
}

function validateComplexity(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  
  return hasUpperCase && hasLowerCase && hasNumber;
}

function validatePassword(password) {
  return validateLength(password) && validateComplexity(password);
}

// 即時檢查密碼輸入
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
      // 隱藏提示信息
      hintElement.textContent = "";
      hintElement.style.display = "none";
  }
}
//及時檢查密碼驗證相同
function checkPasswordConfirm() {
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("confirm-password").value;
  const hintElement = document.getElementById("confirm-password-hint");

  if (password !== passwordConfirm) {
      hintElement.textContent = "密碼不一致";
      hintElement.style.color = "red";
      hintElement.style.display = "block";
  } else {
      // 隱藏提示信息
      hintElement.textContent = "";
      hintElement.style.display = "none";
  }
}

function togglePassword() {
  const passwordField = document.getElementById("password");
  const toggleButton = document.getElementById("toggle-password");

  if (passwordField.type === "password") {
      passwordField.type = "text"; // 將密碼框改為文本框
      toggleButton.textContent = "隱藏"; // 修改按鈕文字為 "隱藏"
  } else {
      passwordField.type = "password"; // 將文本框改回密碼框
      toggleButton.textContent = "顯示"; // 修改按鈕文字為 "顯示"
  }
}
