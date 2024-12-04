// 商品資料，這裡直接寫入資料，而不是從文件讀取
const products = [
    {
        productId: 'product1',
        productName: '商品名稱 1',
        price: 7200,
        description: '這是商品 1 的描述',
        imageUrl: '../material/product/product1.png',
        stock: 10
    },
    {
        productId: 'product2',
        productName: '商品名稱 2',
        price: 68,
        description: '這是商品 2 的描述',
        imageUrl: '../material/product/product2.png',
        stock: 20
    },
    {
        productId: 'product3',
        productName: '商品名稱 3',
        price: 15,
        description: '這是商品 3 的描述',
        imageUrl: '../material/product/product3.png',
        stock: 30
    },
    {
        productId: 'product4',
        productName: '商品名稱 4',
        price: 250,
        description: '這是商品 4 的描述',
        imageUrl: '../material/product/product4.png',
        stock: 40
    },
    {
        productId: 'product5',
        productName: '商品名稱 5',
        price: 2,
        description: '這是商品 5 的描述',
        imageUrl: '../material/product/product5.png',
        stock: 50
    }
];

// 儲存商品資料到 localStorage
function saveProductsToLocalStorage() {
    localStorage.setItem('productData', JSON.stringify(products));
    alert('商品資料已儲存至 LocalStorage');
}

// 按鈕點擊事件，模擬儲存商品資料
function onButtonClick() {
    saveProductsToLocalStorage();
}

