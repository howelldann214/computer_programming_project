document.addEventListener('DOMContentLoaded', function () {
    loadCart();

    // 載入購物車資料並渲染
    function loadCart() {
        const cartContainer = document.querySelector('.cart');
        fetch('/api/cart')
            .then(response => response.json())
            .then(cart => {
                if (cart.length === 0) {
                    cartContainer.innerHTML = '<p>購物車為空。</p>';
                    return;
                }
    
                cartContainer.innerHTML = '';
                let totalItems = 0;
                let totalPrice = 0;
    
                cart.forEach(item => {
                    const cartItem = document.createElement('div');
                    cartItem.classList.add('cart-item');
                    cartItem.innerHTML = `
                        <img src="${item.imageUrl}" alt="${item.productName}">
                        <div class="item-details">
                            <h3>${item.productName}</h3>
                            <p>單價: $${item.price}</p>
                        </div>
                        <div class="item-quantity">
                            <p>
                                數量: <button class="quantity-btn" data-id="${item.productId}" data-change="-1">-</button>
                                ${item.quantity}
                                <button class="quantity-btn" data-id="${item.productId}" data-change="1">+</button>
                            </p>
                        </div>
                        <div class="item-total">
                            <p>小計: $${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    `;
                    cartContainer.appendChild(cartItem);
    
                    totalItems += item.quantity;
                    totalPrice += item.price * item.quantity;
                });
    
                document.querySelector('.original-word').textContent = `(${totalItems}個商品)`;
                document.querySelector('.red-color').textContent = `$${totalPrice.toFixed(2)}`;
                bindQuantityButtons();
            });
    }
    

    // 綁定數量按鈕事件
    function bindQuantityButtons() {
        const buttons = document.querySelectorAll('.quantity-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-id');
                const change = parseInt(this.getAttribute('data-change'), 10);
    
                fetch('/api/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId, quantity: change }) // 發送增量
                })
                .then(response => response.json())
                .then(result => {
                    if (result.message) {
                        loadCart(); // 重新載入購物車
                    } else {
                        alert(result.error || '更新失敗');
                    }
                })
                .catch(error => console.error('更新數量失敗:', error));
            });
        });
    }
    
    
    // 處理結帳按鈕
    document.querySelector('.checkout-btn').addEventListener('click', function () {
        fetch('/checkout', { method: 'POST' })
            .then(response => response.json())
            .then(result => {
                if (result.message) {
                    alert(result.message);
                    loadCart();
                } else {
                    alert(result.error || '結帳失敗');
                }
            });
    });
});
