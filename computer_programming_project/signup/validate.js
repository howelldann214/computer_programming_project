function validateForm() {
  const password = document.getElementById("password").value;

  if (!validateLength(password)) {
      alert("密碼需至少包含 8 位字符");
      return false;
  }

  if (!validateComplexity(password)) {
      alert("密碼必須包含大小寫字母和數字");
      return false;
  }

  const confirmPassword = document.getElementById("confirm-password").value;
  if (password !== confirmPassword) {
      alert("兩次輸入的密碼不一致");
      return false;
  }

  return true;
}

function validateLength(password) {
  return password.length >= 8;
}

function validateComplexity(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
}

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
