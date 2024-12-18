document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.querySelector('.cart-btn');
    const buyNowBtn = document.querySelector('.buy-now-btn');
    const quantityInput = document.getElementById('quantity');
    const productId = new URLSearchParams(window.location.search).get('id');

    // 加入購物車
    cartBtn.addEventListener('click', async () => {
        const quantity = parseInt(quantityInput.value, 10);

        const response = await fetch('/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('商品已加入購物車！');
        } else {
            alert(result.error || '加入購物車失敗');
        }
    });

    // 立即購買
    buyNowBtn.addEventListener('click', async () => {
        const quantity = parseInt(quantityInput.value, 10);

        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('購買成功！');
            window.location.href = '/';
        } else {
            alert(result.error || '購買失敗');
        }
    });
});
