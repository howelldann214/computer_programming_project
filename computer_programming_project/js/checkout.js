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
                <img src="${item.imageUrl}" alt="${item.productId}">
                <div>
                    <p class="item-title">${item.productName}</p> <!-- 顯示商品名稱 -->
                </div>
            </td>
            <td>$${Math.round(item.price)}</td> <!-- 顯示價格，四捨五入為整數 -->
            <td>${item.quantity}</td>
            <td>$${Math.round(item.price * item.quantity)}</td> <!-- 顯示總價，四捨五入為整數 -->
        `;
        orderTableBody.appendChild(row);

        // 計算總價
        totalPrice += item.price * item.quantity;
    });

    // 顯示總價
    const totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = `$${Math.round(totalPrice)}`; // 四捨五入為整數
});
