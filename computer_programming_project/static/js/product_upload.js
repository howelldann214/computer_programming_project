document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('productUploadForm');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', async function (e) {
        e.preventDefault(); // 阻止表單默認提交行為

        const formData = new FormData(form); // 收集表單數據

        try {
            const response = await fetch('/product/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                // 成功訊息
                feedback.textContent = result.message || '商品上傳成功！';
                feedback.style.color = 'green';
                feedback.style.display = 'block';

                // 跳轉到主頁或其他頁面
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                // 錯誤訊息
                feedback.textContent = result.error || '商品上傳失敗，請檢查輸入！';
                feedback.style.color = 'red';
                feedback.style.display = 'block';
            }
        } catch (error) {
            console.error('商品上傳過程中出現錯誤:', error);
            feedback.textContent = '伺服器錯誤，請稍後再試！';
            feedback.style.color = 'red';
            feedback.style.display = 'block';
        }
    });
});
