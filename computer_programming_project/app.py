from flask import Flask, render_template, jsonify, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

# 初始化Flask應用
app = Flask(__name__)

# 設定資料庫連接
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your_secret_key'  # 用於session管理

# 初始化資料庫
db = SQLAlchemy(app)

# 資料庫模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(120), nullable=False)
    product_prices = db.Column(db.Float, nullable=False)
    product_in_stock = db.Column(db.Integer, nullable=False)
    product_infor = db.Column(db.String(500))
    product_first_image = db.Column(db.String(120))
    product_other_image = db.Column(db.String(120))

# 路由：檢查登入狀態
@app.route('/check_login', methods=['GET'])
def check_login():
    if 'user_id' in session:  # 如果session中有用戶ID，表示用戶已登入
        return jsonify({"isLoggedIn": True}), 200
    return jsonify({"isLoggedIn": False}), 200

# 路由：顯示註冊頁面
@app.route('/signup', methods=['GET'])
def signup():
    return render_template('signup.html')  # 渲染 signup.html 頁面

# 路由：註冊頁面處理
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "Registration successful"}), 201

# 路由：顯示登入頁面
@app.route('/login', methods=['GET'])
def login_page():
    return render_template('login.html')  # 渲染 login.html 頁面

# 路由：處理登入請求
@app.route('/login', methods=['POST'])
def handle_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 根據用戶名查詢資料庫
    user = User.query.filter_by(username=username).first()

    # 如果用戶存在且密碼正確，登入成功
    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id  # 設定登入狀態
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid username or password"}), 400

# 路由：登出
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)  # 清除session中的用戶資料
    return jsonify({"message": "Logout successful"}), 200

# 路由：結帳頁面（示範庫存更新）
@app.route('/checkout', methods=['POST'])
def checkout():
    data = request.get_json()
    cart_items = data.get('cart_items')  # 購物車項目
    for item in cart_items:
        product = Product.query.filter_by(id=item['product_id']).first()
        if product:
            product.product_in_stock -= item['quantity']
    db.session.commit()
    return jsonify({"message": "Checkout successful"}), 200

# 從資料庫調取商品資料的API
@app.route('/api/products', methods=['GET'])
def get_products_api():
    products = Product.query.all()  # 從資料庫中獲取所有商品
    product_list = [{
        'productId': product.id,
        'productName': product.product_name,
        'imageUrl': product.product_first_image,
        'price': product.product_prices
    } for product in products]
    return jsonify(product_list)

# 根據商品 ID 查詢單個商品的路由
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if product:
        return jsonify({
            'productId': product.id,
            'productName': product.product_name,
            'price': product.product_prices,
            'product_in_stock': product.product_in_stock,
            'product_infor': product.product_infor,
            'product_first_image': product.product_first_image
        })
    return jsonify({'error': '商品未找到'}), 404

# 路由：顯示商品詳細頁面
@app.route('/product')
def product():
    product_id = request.args.get('id')  # 獲取URL中的id參數
    product = Product.query.get(product_id)  # 根據商品ID查詢商品資料

    if product:
        # 將商品資料傳遞給模板
        return render_template('product.html', product=product)
    else:
        return "商品未找到", 404

# 路由：顯示主頁面
@app.route('/')
def index():
    return render_template('main.html')  # 渲染 main.html 頁面

# 路由：顯示結帳頁面
@app.route('/cart')
def cart():
    return render_template('cart.html')

# 路由：顯示商品上傳頁面
@app.route('/upload_product')
def upload_product():
    return render_template('product_upload.html')

if __name__ == '__main__':
    # 創建資料庫表格（若尚未創建）
    with app.app_context():
        db.create_all()
    # 運行Flask應用
    app.run(debug=True)
