// 模擬讀取 productSelect 的商品資料
function loadProductsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('productSelect')) || [];
    const productContainer = document.getElementById('product-container');

    // 清空目前的格子容器
    productContainer.innerHTML = '';

    // 遍歷商品資料並創建商品格子
    products.forEach(product => {
        const productItem = document.createElement('a');
        productItem.href = `../product/product.html?id=${product.productId}`;  // 連結到商品詳情頁
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

// 按鈕點擊事件，模擬儲存商品資料
function onButtonClick() {
    saveProductsToLocalStorage();
}

// 儲存商品資料到 localStorage
function saveProductsToLocalStorage() {
    const products = [];

    for (let i = 1; i <= 5; i++) {
        const productInfo = getProductInfoFromFile(`C:\\Users\\howel\\iCloudDrive\\code\\computer_programming_project\\material\\Product\\product${i}.txt`);
        
        const product = {
            productId: `product${i}`,
            productName: productInfo.productName,
            price: productInfo.productPrice,
            description: productInfo.productDescription,
            imageUrl: productInfo.imageUrl,
            stock: 10 * i,  // 庫存量：分別為 10, 20, 30, 40, 50
        };

        products.push(product);
    }

    // 儲存商品資料到 localStorage
    localStorage.setItem('productSelect', JSON.stringify(products));
    alert('商品資料已儲存至 LocalStorage');
    loadProductsFromLocalStorage();  // 儲存後重新載入商品資料
}


// 頁面加載後自動載入商品資料
window.onload = function() {
    loadProductsFromLocalStorage();
};
