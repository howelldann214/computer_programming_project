document.addEventListener('DOMContentLoaded', function () {
    // 讀取購物車資料
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderTableBody = document.querySelector('.order tbody');
    let totalPrice = 0;

    // 渲染購物車商品
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="item-details">
                <img src="https://example.com/product.jpg" alt="${item.productId}">
                <div>
                    <p class="item-title">${item.productId}</p>
                </div>
            </td>
            <td>$${item.price}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderTableBody.appendChild(row);

        // 計算總價
        totalPrice += item.price * item.quantity;
    });

    // 顯示總價
    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
});
