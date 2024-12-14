document.addEventListener('DOMContentLoaded', function () {
    // 讀取 URL 中的商品 ID 參數
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id'); // 例如 '1'

    // 從後端 API 根據商品 ID 讀取商品資料
    fetch(`/api/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            if (product) {
                // 根據商品資料更新頁面內容
                document.querySelector('#product-title').textContent = product.productName;
                document.querySelector('#product-price').textContent = `$${product.price}`;
                document.querySelector('#product-stock').textContent = `庫存：${product.product_in_stock} 件`;
                document.querySelector('#product-description').innerHTML = `<li>${product.product_infor}</li>`; // 更新商品描述
                document.querySelector('#product-image').src = product.product_first_image; // 更新商品圖片

                // 設定 "加入購物車" 按鈕的事件
                const cartBtn = document.querySelector('.cart-btn');
                cartBtn.addEventListener('click', function () {
                    // 檢查是否已登入
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    if (!isLoggedIn) {
                        alert('請先登入才能將商品加入購物車');
                        window.location.href = '/login';  // 跳轉到登入頁面
                        return;  // 阻止加入購物車的動作
                    }

                    const quantity = parseInt(document.querySelector('#quantity').value, 10);

                    // 檢查選擇的數量是否大於庫存
                    if (quantity <= 0 || quantity > product.product_in_stock) {
                        alert('請選擇有效的數量！超過庫存數量！');
                        return;  // 阻止加入購物車的動作
                    }

                    const productSelect = {
                        productId: product.productId,
                        productName: product.productName,
                        price: product.price,
                        quantity: quantity,
                        imageUrl: product.product_first_image
                    };

                    // 獲取現有的購物車資料，如果有則更新，沒有則新增
                    let cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];

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
                    window.location.href = '/'; // 立即跳轉回到主頁面
                });

                // 設定 "立即購買" 按鈕的事件
                const buyNowBtn = document.querySelector('.buy-now-btn');
                buyNowBtn.addEventListener('click', function () {
                    // 檢查是否已登入
                    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                    if (!isLoggedIn) {
                        alert('請先登入才能進行購買');
                        window.location.href = '/login';  // 跳轉到登入頁面
                        return;  // 阻止立即購買的動作
                    }

                    const quantity = parseInt(document.querySelector('#quantity').value, 10);

                    // 檢查選擇的數量是否大於庫存
                    if (quantity <= 0 || quantity > product.product_in_stock) {
                        alert('請選擇有效的數量！超過庫存數量！');
                        return;  // 阻止立即購買的動作
                    }

                    const productSelect = {
                        productId: product.productId,
                        productName: product.productName,
                        price: product.price,
                        quantity: quantity,
                        imageUrl: product.product_first_image
                    };

                    let cart = JSON.parse(localStorage.getItem('ProductSelect')) || [];

                    const existingProductIndex = cart.findIndex(p => p.productId === product.productId);
                    if (existingProductIndex !== -1) {
                        // 如果商品已經存在，則更新數量
                        cart[existingProductIndex].quantity += quantity;
                    } else {
                        // 否則新增商品
                        cart.push(productSelect);
                    }

                    // 儲存到 localStorage
                    localStorage.setItem('ProductSelect', JSON.stringify([productSelect]));

                    window.location.href = '/cart'; // 立即跳轉到結帳頁面
                });
            } else {
                alert('商品未找到！');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
});
