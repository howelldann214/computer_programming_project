import os

from flask import Flask
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from models import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
app.config['SECRET_KEY'] = os.urandom(24)

# 初始化資料庫
db.init_app(app)

# 註冊 Blueprint
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(product_bp, url_prefix='/products')

if __name__ == '__main__':
    app.run(debug=True)
