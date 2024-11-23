document.addEventListener('DOMContentLoaded', function () {
    const transportButtons = document.querySelectorAll('.transport-method .method-btn');
    const transportInput = document.getElementById('transport-input');

    // 获取地址和超商容器
    const addressContainer = document.getElementById('address-container');
    const storeContainer = document.getElementById('store-container');

    transportButtons.forEach(button => {
        button.addEventListener('click', function () {
            // 移除所有按钮的 "selected" 样式
            transportButtons.forEach(btn => btn.classList.remove('selected'));
            // 为当前点击的按钮添加 "selected" 样式
            button.classList.add('selected');
            // 更新隐藏输入框的值
            transportInput.value = button.dataset.value;

            // 判断选中的是哪一个按钮，并显示相应的输入框
            if (button.dataset.value === 'home') {
                addressContainer.style.display = 'block';
                storeContainer.style.display = 'none';
            } else if (button.dataset.value === 'store') {
                addressContainer.style.display = 'none';
                storeContainer.style.display = 'block';
            }

            // 实时输出选择的值到控制台（可选）
            console.log('選擇的運送方式:', transportInput.value);
        });
    });
});
