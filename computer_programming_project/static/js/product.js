document.addEventListener('DOMContentLoaded', function () {
    // 讀取 URL 中的商品 ID 參數
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // 例如 'product1'

    // 從 localStorage 讀取商品資料（使用 'productData' 鍵）
    const products = JSON.parse(localStorage.getItem('productData')) || [];
    const product = products.find(p => p.productId === productId);  // 根據 productId 找對應商品

    if (product) {
        // 根據商品資料更新頁面內容
        document.querySelector('#product-title').textContent = product.productName;
        document.querySelector('#product-price').textContent = `$${product.price}`;
        document.querySelector('#product-stock').textContent = `庫存：${product.stock} 件`;
        document.querySelector('#product-description').innerHTML = `<li>${product.description}</li>`; // 更新商品描述
        document.querySelector('#product-image').src = product.imageUrl; // 更新商品圖片

        // 設定 "加入購物車" 按鈕的事件
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.addEventListener('click', function () {
            // 取得用戶選擇的數量，並轉換為整數
            const quantity = parseInt(document.querySelector('#quantity').value, 10);

            // 確保選擇的數量大於 0 且不超過庫存
            if (quantity <= 0 || quantity > product.stock) {
                alert('請選擇有效的數量！');
                return;
            }

            // 構建商品資料，並儲存到 'ProductSelect' (localStorage)
            const productSelect = {
                productId: product.productId,
                productName: product.productName,
                price: product.price,
                quantity: quantity,
                imageUrl: product.imageUrl
            };

            // 獲取現有的購物車資料，如果有則更新，沒有則新增
            let cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];

            // 檢查是否已有該商品，如果有則更新數量，否則新增商品
            const existingProductIndex = cart.findIndex(p => p.productId === product.productId);
            if (existingProductIndex !== -1) {
                // 如果商品已經存在，則更新數量
                cart[existingProductIndex].quantity += quantity; // 累加數量
            } else {
                // 否則新增商品
                cart.push(productSelect);
            }

            // 儲存到 localStorage
            localStorage.setItem('ProductSelect', JSON.stringify(cart));

            alert('商品已加入購物車！');
            window.location.href = '../templates/main.html'; // 立即跳轉回到主頁面
        });

        // 設定 "立即購買" 按鈕的事件
        const buyNowBtn = document.querySelector('.buy-now-btn');
        buyNowBtn.addEventListener('click', function () {
            // 取得用戶選擇的數量，並轉換為整數
            const quantity = parseInt(document.querySelector('#quantity').value, 10);

            // 確保選擇的數量大於 0 且不超過庫存
            if (quantity <= 0 || quantity > product.stock) {
                alert('請選擇有效的數量！');
                return;
            }

            // 構建商品資料，並儲存到 'ProductSelect' (localStorage)
            const productSelect = {
                productId: product.productId,
                productName: product.productName,
                price: product.price,
                quantity: quantity,
                imageUrl: product.imageUrl
            };

            // 獲取現有的購物車資料，如果有則更新，沒有則新增
            let cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];

            // 檢查是否已有該商品，如果有則更新數量，否則新增商品
            const existingProductIndex = cart.findIndex(p => p.productId === product.productId);
            if (existingProductIndex !== -1) {
                // 如果商品已經存在，則更新數量
                cart[existingProductIndex].quantity += quantity; // 累加數量
            } else {
                // 否則新增商品
                cart.push(productSelect);
            }

            localStorage.setItem('ProductSelect', JSON.stringify([productSelect]));

            window.location.href = '../templates/cart.html'; // 立即跳轉到結帳頁面
        });
    } else {
        alert('商品未找到！');
    }
});
