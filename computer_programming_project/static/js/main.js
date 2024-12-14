document.addEventListener('DOMContentLoaded', function () {
    loadProductsFromAPI();  // 從後端 API 讀取並顯示商品
});

// 從後端 API 讀取商品資料並顯示
function loadProductsFromAPI() {
    const productContainer = document.getElementById('product-container');

    // 清空目前的格子容器
    productContainer.innerHTML = '';

    // 從後端 API 讀取商品資料
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            // 遍歷商品資料並創建商品格子
            products.forEach(product => {
                const productItem = document.createElement('a');
                productItem.href = `/product?id=${product.productId}`;  // 正確的路徑，傳遞商品 ID
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
        })
        .catch(error => console.error('Error fetching products:', error));
}
