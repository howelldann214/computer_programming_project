document.addEventListener('DOMContentLoaded', function () {
    // 讀取來自 ProductSelect 的購物車資料並顯示
    loadCart();

    const quantityBtns = document.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.removeEventListener('click', handleQuantityChange); // 移除舊的事件，避免重複註冊
        btn.addEventListener('click', handleQuantityChange); // 綁定新的事件
    });

    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.removeEventListener('click', handleRemoveItem); // 移除舊的事件
        btn.addEventListener('click', handleRemoveItem); // 綁定新的事件
    });

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            saveCartToCheckout(); // 儲存購物車資料到 cart，然後跳轉到結帳頁面
            window.location.href = '../checkout/checkout.html'; // 跳轉到結帳頁面
        });
    }
});

// 處理數量增減按鈕的點擊事件
function handleQuantityChange() {
    const quantitySpan = this.parentElement.querySelector('.quantity');
    let quantity = parseInt(quantitySpan.textContent, 10);
    if (this.textContent === '+') {
        quantity++;
    } else if (this.textContent === '-' && quantity > 1) {
        quantity--;
    }
    quantitySpan.textContent = quantity;

    // 更新商品數量並計算
    const cartItemElement = this.closest('.cart-item');
    const productId = cartItemElement.querySelector('img').alt;
    const cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];
    const item = cart.find(item => item.productId === productId);
    if (item) {
        item.quantity = quantity;
    }

    // 更新單個商品總價
    updateItemTotal(this, quantity);
    // 儲存更新後的購物車資料
    localStorage.setItem('ProductSelect', JSON.stringify(cart));
    
    // 更新整體購物車總價
    updateCartTotal(); 
}

// 處理移除商品按鈕的點擊事件
function handleRemoveItem() {
    const cartItemElement = this.closest('.cart-item');
    const productId = cartItemElement.querySelector('img').alt;
    const cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];
    const index = cart.findIndex(item => item.productId === productId);
    if (index !== -1) {
        cart.splice(index, 1); // 移除商品
    }
    cartItemElement.remove(); // 移除頁面上的商品
    localStorage.setItem('ProductSelect', JSON.stringify(cart)); // 儲存更新後的購物車資料
    updateCartTotal(); // 重新計算總價
}

// 儲存購物車資料到 cart 中
function saveCartToCheckout() {
    const cartItems = [];
    const cartItemElements = document.querySelectorAll('.cart-item');
    cartItemElements.forEach(item => {
        const productId = item.querySelector('img').alt; // 假設商品名稱為圖片的 alt 屬性
        const productName = item.querySelector('.item-details h3').textContent; // 商品名稱
        const price = parseFloat(item.querySelector('.item-prices p').textContent.replace('$', '')); // 商品價格
        const quantity = parseInt(item.querySelector('.quantity').textContent, 10); // 商品數量
        const imageUrl = item.querySelector('img').src; // 商品圖片 URL

        cartItems.push({ productId, productName, price, quantity, imageUrl }); // 推入新的 cart 資料
    });
    localStorage.setItem('cart', JSON.stringify(cartItems)); // 儲存到 cart
}

// 更新單個商品的總價
function updateItemTotal(button, quantity) {
    const itemPrice = parseFloat(button.closest('.cart-item').querySelector('.item-prices p').textContent.replace('$', ''));
    const itemTotal = button.closest('.cart-item').querySelector('.item-total h3');
    itemTotal.textContent = `$${Math.round(itemPrice * quantity)}`; // 顯示總價為整數
}

// 更新整體購物車的總價和商品項目數量
function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];
    let totalPrice = 0;
    let totalItems = cart.length;  // 商品項目數量，即購物車中的不同商品數量

    cart.forEach(item => {
        totalPrice += item.price * item.quantity; // 累計每個商品的總價
    });

    // 更新頁面顯示的總價，四捨五入為整數
    document.querySelector('.cart-total .red-color').textContent = `$${Math.round(totalPrice)}`;
    // 更新頁面顯示的商品項目數量
    document.querySelector('.cart-total .original-word').textContent = `(${totalItems}項商品)`;
}

// 載入購物車資料並渲染商品到頁面
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('ProductSelect')) || []; // 從 ProductSelect 讀取資料
    const cartContainer = document.querySelector('.cart'); // 確保這裡有正確的元素容器來顯示商品

    // 清空目前的購物車內容
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.productId}" />
            <div class="item-details">
                <h3>${item.productName}</h3>
            </div>
            <div class="item-prices">
                <p>$${Math.round(item.price)}</p> <!-- 顯示價格為整數 -->
            </div>
            <div class="item-quantity">
                <button class="quantity-btn">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn">+</button>
                <button class="remove-btn">移除</button>
            </div>
            <div class="item-total">
                <h3>$${Math.round(item.price * item.quantity)}</h3> <!-- 顯示總價為整數 -->
            </div>
        `;
        cartContainer.appendChild(cartItemElement); // 添加到頁面

        // 設定移除商品按鈕的事件
        cartItemElement.querySelector('.remove-btn').addEventListener('click', handleRemoveItem);

        // 設定數量增減按鈕的事件
        const quantityBtns = cartItemElement.querySelectorAll('.quantity-btn');
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', handleQuantityChange);
        });
    });

    updateCartTotal(); // 初始化時更新總價
}

// 儲存購物車資料
function saveCart() {
    const cartItems = [];
    const cartItemElements = document.querySelectorAll('.cart-item');
    cartItemElements.forEach(item => {
        const productId = item.querySelector('img').alt;
        const quantity = parseInt(item.querySelector('.quantity').textContent, 10);
        const price = parseFloat(item.querySelector('.item-prices p').textContent.replace('$', ''));
        cartItems.push({ productId, quantity, price });
    });
    localStorage.setItem('ProductSelect', JSON.stringify(cartItems)); // 儲存更新後的資料到 localStorage
}
