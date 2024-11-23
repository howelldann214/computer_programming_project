document.addEventListener('DOMContentLoaded', function () {
    // 載入來自 productSelect 的購物車資料並顯示
    loadCart();

    // 設定數量增減按鈕的事件
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const quantitySpan = this.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent, 10);

            // 確保數量增減正確
            if (this.textContent === '+') {
                quantity++;
            } else if (this.textContent === '-' && quantity > 1) {
                quantity--;
            }

            // 更新顯示數量
            quantitySpan.textContent = quantity;

            // 更新單個商品的總價
            updateItemTotal(this, quantity);

            // 更新整體購物車總價
            updateCartTotal();

            // 儲存更新後的購物車資料
            saveCart();
        });
    });

    // 設定移除商品按鈕的事件
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('.cart-item').remove(); // 移除商品
            updateCartTotal(); // 更新購物車總價
            saveCart(); // 儲存更新後的購物車資料
        });
    });

    // 結帳按鈕
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            saveCartToCheckout(); // 儲存購物車資料到 cart，然後跳轉到結帳頁面
            window.location.href = '../checkout/checkout.html'; // 跳轉到結帳頁面
        });
    }
});

// 儲存購物車資料到 cart 中
function saveCartToCheckout() {
    const cartItems = [];
    const cartItemElements = document.querySelectorAll('.cart-item');
    cartItemElements.forEach(item => {
        const productId = item.querySelector('img').alt; // 假設商品名稱為圖片的 alt 屬性
        const quantity = parseInt(item.querySelector('.quantity').textContent, 10);
        const price = parseFloat(item.querySelector('.item-prices p').textContent.replace('$', ''));
        cartItems.push({ productId, quantity, price });
    });
    localStorage.setItem('cart', JSON.stringify(cartItems)); // 儲存到 cart
}

// 更新單個商品的總價
function updateItemTotal(button, quantity) {
    const itemPrice = parseFloat(button.closest('.cart-item').querySelector('.item-prices p').textContent.replace('$', ''));
    const itemTotal = button.closest('.cart-item').querySelector('.item-total h3');
    itemTotal.textContent = `$${(itemPrice * quantity).toFixed(2)}`;
}

// 更新整體購物車的總價和商品數量
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('productSelect')) || [];
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity; // 累計每個商品的總價
        totalItems += item.quantity; // 累計商品的數量
    });

    // 更新頁面顯示的總價
    document.querySelector('.cart-total .red-color').textContent = `$${totalPrice.toFixed(2)}`;
    // 更新頁面顯示的商品數量
    document.querySelector('.cart-total .original-word').textContent = `(${totalItems}個商品)`;
}

// 載入購物車資料並渲染商品到頁面
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('productSelect')) || [];
    const cartContainer = document.querySelector('.cart'); // 確保這裡有正確的元素容器來顯示商品
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="https://example.com/product.jpg" alt="${item.productId}" />
            <div class="item-details">
                <h3>${item.productId}</h3>
            </div>
            <div class="item-prices">
                <p>$${item.price}</p>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn">+</button>
                <button class="remove-btn">移除</button>
            </div>
            <div class="item-total">
                <h3>$${(item.price * item.quantity).toFixed(2)}</h3>
            </div>
        `;
        cartContainer.appendChild(cartItemElement); // 添加到頁面

        // 設定移除商品按鈕的事件
        cartItemElement.querySelector('.remove-btn').addEventListener('click', function () {
            cartItemElement.remove(); // 移除商品
            updateCartTotal(); // 更新總價
            saveCart(); // 儲存更新後的購物車資料
        });
    });

    updateCartTotal(); // 初始化時更新總價
}
