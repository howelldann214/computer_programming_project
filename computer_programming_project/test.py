from app import db, Product, app  # 引入 app 以啟用應用上下文

def show_products():
    """顯示商品資料庫中的所有商品"""
    with app.app_context():  # 建立應用上下文
        products = Product.query.all()
        print("商品資料庫內容：")
        print("ID\t名字\t價格")
        print("-" * 30)
        for product in products:
            print(f"{product.id}\t{product.product_name}\t{int(product.product_prices)}")
        print("-" * 30)

def delete_product_by_id():
    """根據輸入的 ID 刪除商品"""
    product_id = input("請輸入要刪除的商品 ID（輸入 0 退出）：")
    if product_id == "0":
        print("退出操作。")
        return

    # 嘗試將輸入轉換為整數
    try:
        product_id = int(product_id)
    except ValueError:
        print("請輸入有效的數字 ID。")
        return

    with app.app_context():  # 建立應用上下文
        product = Product.query.get(product_id)
        if product:
            db.session.delete(product)
            db.session.commit()
            print(f"商品 ID {product_id} 已成功刪除！")
        else:
            print(f"商品 ID {product_id} 不存在。")

def main():
    while True:
        show_products()
        delete_product_by_id()

if __name__ == "__main__":
    main()
