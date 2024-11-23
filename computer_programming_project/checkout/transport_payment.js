//運送、付款UI製作
document.addEventListener('DOMContentLoaded', function () {
    const transportButtons = document.querySelectorAll('.transport-method .method-btn');
    const paymentButtons = document.querySelectorAll('.payment-method .method-btn');

    transportButtons.forEach(button => {
        button.addEventListener('click', function () {
            transportButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            document.getElementById('transport-input').value = button.dataset.value;
        });
    });

    paymentButtons.forEach(button => {
        button.addEventListener('click', function () {
            paymentButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            document.getElementById('payment-input').value = button.dataset.value;
        });
    });
});

//提示購買完成並跳回主畫面
document.addEventListener('DOMContentLoaded', function () {
    const payButton = document.querySelector('.pay-btn');

    payButton.addEventListener('click', function () {
        // 显示购买完成的消息
        alert('購買完成，感謝您的購買');
        // 跳轉回主畫面 (例如 main.html)
        window.location.href = '../main/main.html';
    });
});
