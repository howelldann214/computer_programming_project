document.addEventListener('DOMContentLoaded', function () {
    loadProductsFromLocalStorage();  // 從 localStorage 讀取並顯示商品
});

// 從 localStorage 讀取商品資料並顯示
function loadProductsFromLocalStorage() {
    const productContainer = document.getElementById('product-container');

    // 清空目前的格子容器
    productContainer.innerHTML = '';

    // 從 localStorage 讀取商品資料
    const products = JSON.parse(localStorage.getItem('productData')) || [];  // 使用 'productData' 鍵

    // 遍歷商品資料並創建商品格子
    products.forEach(product => {
        const productItem = document.createElement('a');
        productItem.href = `../templates/product.html?id=${product.productId}`;  // 連結到商品詳情頁
        productItem.classList.add('grid-link');

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');

        gridItem.innerHTML = `
            <div class="image-container">
                <img src="${product.imageUrl}" alt="${product.productName}">
            </div>
            <h3>${product.productName}</h3>
            <h3 class="price">$${product.price}</h3>
        `;

        productItem.appendChild(gridItem);
        productContainer.appendChild(productItem);
    });
}


// 頁面加載後自動載入商品資料
window.onload = function() {
    loadProductsFromLocalStorage();
};

function deleteButtonClick(){
    localStorage.removeItem('productSelect');
    localStorage.removeItem('cart');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('productData');
    localStorage.removeItem('password');
    localStorage.removeItem('products');
    alert('資料已刪除');
    
}