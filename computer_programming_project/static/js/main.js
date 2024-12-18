document.addEventListener('DOMContentLoaded', loadProductsFromAPI);

async function loadProductsFromAPI() {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // 清空當前內容

    try {
        const response = await fetch('/api/products');
        const products = await response.json();

        products.forEach(product => {
            const productLink = document.createElement('a');
            productLink.href = `/product?id=${product.productId}`;
            productLink.classList.add('grid-link');

            const productItem = document.createElement('div');
            productItem.classList.add('grid-item');

            productItem.innerHTML = `
                <div class="image-container">
                    <img src="${product.product_first_image}" alt="${product.productName}">
                </div>
                <h3>${product.productName}</h3>
                <p class="price">$${product.price}</p>
            `;

            productLink.appendChild(productItem);
            productContainer.appendChild(productLink);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}
