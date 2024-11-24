document.addEventListener('DOMContentLoaded', function () {
    const transportButtons = document.querySelectorAll('.transport-method .method-btn');
    const paymentButtons = document.querySelectorAll('.payment-method .method-btn');
    const payButton = document.querySelector('.pay-btn');
    
    const transportInput = document.getElementById('transport-input');
    const paymentInput = document.getElementById('payment-input');

    const addressContainer = document.getElementById('address-container');
    const storeContainer = document.getElementById('store-container');
    const addressInput = document.getElementById('address');
    const storeSelect = document.getElementById('store-select');
    const branchInput = document.getElementById('branch');

    let isTransportSelected = false;
    let isPaymentSelected = false;

    // 運送方式選擇
    transportButtons.forEach(button => {
        button.addEventListener('click', function () {
            transportButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            transportInput.value = button.dataset.value;

            // 判斷選擇的運送方式並顯示對應的輸入框
            if (button.dataset.value === 'home') {
                addressContainer.style.display = 'block';
                storeContainer.style.display = 'none';
            } else if (button.dataset.value === 'store') {
                addressContainer.style.display = 'none';
                storeContainer.style.display = 'block';
            }

            // 標記運送方式已選擇
            isTransportSelected = true;
        });
    });

    // 付款方式選擇
    paymentButtons.forEach(button => {
        button.addEventListener('click', function () {
            paymentButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            paymentInput.value = button.dataset.value;

            // 標記付款方式已選擇
            isPaymentSelected = true;
        });
    });

    // 付款按鈕點擊事件
    payButton.addEventListener('click', function () {
        // 檢查是否選擇了運送和付款方式
        if (!isTransportSelected || !isPaymentSelected) {
            alert('請選擇運送方式和付款方式！');
            return;
        }

        // 檢查運送方式和付款方式的必填欄位
        if (transportInput.value === 'home' && !addressInput.value) {
            alert('請填寫地址！');
            return;
        }

        if (transportInput.value === 'store' && (!storeSelect.value || !branchInput.value)) {
            alert('請選擇便利商店並填寫分店！');
            return;
        }

        if (paymentInput.value === 'cash' && !branchInput.value) {
            alert('請填寫分店！');
            return;
        }

        // 從 localStorage 讀取購物車資料和 productData
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productData = JSON.parse(localStorage.getItem('productData')) || [];

        // 更新 productData 的庫存
        cart.forEach(item => {
            // 找到對應的商品
            const product = productData.find(product => product.productId === item.productId);
            if (product) {
                // 減少庫存
                product.stock -= item.quantity;
            }
        });

        // 將更新後的 productData 儲存回 localStorage
        localStorage.setItem('productData', JSON.stringify(productData));

        // 顯示完成訊息
        alert('購買完成，感謝您的購買');

        // 清空購物車資料（localStorage）
        localStorage.removeItem('cart');
        localStorage.removeItem('ProductSelect');

        // 跳轉回主頁面
        window.location.href = '../main/main.html';
    });

});
