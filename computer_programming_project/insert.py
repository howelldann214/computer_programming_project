from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# 初始化Flask應用
app = Flask(__name__)

# 設定資料庫連接
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 初始化資料庫
db = SQLAlchemy(app)

# 資料庫模型
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(120), nullable=False)
    product_prices = db.Column(db.Float, nullable=False)
    product_in_stock = db.Column(db.Integer, nullable=False)
    product_infor = db.Column(db.String(500))
    product_first_image = db.Column(db.String(120))
    product_other_image = db.Column(db.String(120))

# 查詢並顯示所有商品
def view_products():
    products = Product.query.all()
    if not products:
        print("資料庫中沒有商品資料")
    else:
        for product in products:
            print(f"商品名稱: {product.product_name}")
            print(f"商品價格: {product.product_prices}")
            print(f"庫存: {product.product_in_stock}")
            print(f"描述: {product.product_infor}")
            print(f"第一張圖片: {product.product_first_image}")
            print("-" * 30)

# 顯示資料庫中的商品資料
if __name__ == '__main__':
    with app.app_context():
        view_products()  # 查詢並顯示商品資料
