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
    } else {
        // 如果未找到商品，顯示錯誤訊息
        alert('商品未找到！');
    }
});
