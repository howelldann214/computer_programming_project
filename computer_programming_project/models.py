from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# 使用者模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# 商品模型
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    product_prices = db.Column(db.Float, nullable=False)
    product_in_stock = db.Column(db.Integer, nullable=False)
    product_infor = db.Column(db.Text, nullable=True)
    product_first_image = db.Column(db.String(200), nullable=True)
    product_other_image = db.Column(db.String(200), nullable=True)
