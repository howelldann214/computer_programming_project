// 商品資料，這裡直接寫入資料，而不是從文件讀取
const products = [
    {
        productId: 'product1',
        productName: '商品名稱 1',
        price: 7200,
        description: '這是商品 1 的描述',
        imageUrl: 'https://img.pchome.com.tw/cs/items/DMBL53A900HVOMD/000001_1727236783.jpg',
        stock: 10
    },
    {
        productId: 'product2',
        productName: '商品名稱 2',
        price: 68,
        description: '這是商品 2 的描述',
        imageUrl: 'https://agirls.aottercdn.com/media/f22b4529-4b61-4316-a4ae-e8c7544a4ea8.jpg',
        stock: 20
    },
    {
        productId: 'product3',
        productName: '商品名稱 3',
        price: 15,
        description: '這是商品 3 的描述',
        imageUrl: 'https://tutor3.jpg',
        stock: 30
    },
    {
        productId: 'product4',
        productName: '商品名稱 4',
        price: 250,
        description: '這是商品 4 的描述',
        imageUrl: 'https://tutor4.jpg',
        stock: 40
    },
    {
        productId: 'product5',
        productName: '商品名稱 5',
        price: 2,
        description: '這是商品 5 的描述',
        imageUrl: 'https://tutor5.jpg',
        stock: 50
    }
];

// 從 localStorage 讀取商品資料並顯示
function loadProductsFromLocalStorage() {
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

// 儲存商品資料到 localStorage
function saveProductsToLocalStorage() {
    // 將商品資料儲存到 localStorage 使用新名稱 'productData'
    localStorage.setItem('productData', JSON.stringify(products));
    alert('商品資料已儲存至 LocalStorage');
    loadProductsFromLocalStorage();  // 儲存後重新載入商品資料
}

// 按鈕點擊事件，模擬儲存商品資料
function onButtonClick() {
    saveProductsToLocalStorage();
}

// 頁面加載後自動載入商品資料
window.onload = function() {
    loadProductsFromLocalStorage();
    saveProductsToLocalStorage
};