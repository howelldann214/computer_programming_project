document.querySelector('.pay-btn').addEventListener('click', async () => {
    const res = await fetch('/checkout', { method: 'POST' });
    const data = await res.json();

    if (res.ok) {
        alert('結帳成功！');
        window.location.href = '/';
    } else {
        alert(data.error || '結帳失敗');
    }
});
