from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project.db'
app.config['SECRET_KEY'] = 'your_secret_key'


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# 資料庫模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    product_prices = db.Column(db.Float, nullable=False)
    product_in_stock = db.Column(db.Integer, nullable=False)
    product_infor = db.Column(db.String(200))
    product_first_image = db.Column(db.String(200))

# 初始化資料庫
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def index():
    return render_template('index.html')

# 登入
@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.json
        user = User.query.filter_by(username=data['username']).first()
        if user and bcrypt.check_password_hash(user.password, data['password']):
            session['username'] = user.username
            return jsonify({"message": "Login successful"})
        return jsonify({"error": "Invalid username or password"}), 401
    elif request.method == 'GET':
        return render_template('login.html')

# 註冊
@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        data = request.json
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(username=data['username'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Registration successful"})
    elif request.method == 'GET':
        return render_template('signup.html')

# 登出
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({"message": "Logout successful"})

# 檢查登入狀態
@app.route('/check_login', methods=['GET'])
def check_login():
    is_logged_in = 'username' in session
    return jsonify({"isLoggedIn": is_logged_in})

@app.route('/api/check_login', methods=['GET'])
def api_check_login():
    if 'username' in session:
        return jsonify({"isLoggedIn": True, "username": session['username']})
    return jsonify({"isLoggedIn": False})

# 取得所有商品資料
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([
        {
            "productId": product.id,
            "productName": product.product_name,
            "price": product.product_prices,
            "product_in_stock": product.product_in_stock,
            "product_first_image": product.product_first_image
        }
        for product in products
    ])

@app.route('/product', methods=['GET'])
def product_detail():
    product_id = request.args.get('id')  # 從 URL 參數獲取商品 ID
    if not product_id:
        return "商品 ID 未提供", 400

    product = Product.query.get(product_id)  # 從資料庫查找對應商品
    if not product:
        return "商品不存在", 404

    return render_template('product.html', product=product)




# 渲染商品上傳頁面
@app.route('/product/upload', methods=['GET'])
def product_upload_page():
    if 'username' not in session:
        return redirect(url_for('login'))  # 未登入跳轉到登入頁
    return render_template('product_upload.html')


# 處理商品上傳
# 設定檔案上傳的路徑
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'static', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/product/upload', methods=['POST'])
def product_upload():
    if 'username' not in session:
        return jsonify({"error": "請先登入"}), 401

    # 接收表單資料
    product_name = request.form.get('productName')
    product_description = request.form.get('productDescription')
    product_price = request.form.get('productPrice', type=float)
    product_stock = request.form.get('productStock', type=int)

    # 確保資料正確
    if not (product_name and product_description and product_price and product_stock):
        return jsonify({"error": "所有欄位皆為必填"}), 400

    # 處理圖片上傳
    if 'productFirstImages' not in request.files:
        return jsonify({"error": "請上傳首張商品圖片"}), 400

    product_first_image = request.files['productFirstImages']
    if product_first_image.filename == '':
        return jsonify({"error": "請選擇有效的圖片檔案"}), 400

    # 儲存圖片
    filename = secure_filename(product_first_image.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    product_first_image.save(file_path)

    # 將資料存入資料庫
    new_product = Product(
        product_name=product_name,
        product_prices=product_price,
        product_in_stock=product_stock,
        product_infor=product_description,
        product_first_image=f'/static/uploads/{filename}'
    )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "商品上傳成功！"})

@app.route('/cart', methods=['GET'])
def cart_page():
    return render_template('cart.html')

# 加入購物車
@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get('productId')
    quantity_change = data.get('quantity')

    if not product_id or quantity_change is None:
        return jsonify({"error": "無效的數據"}), 400

    product = Product.query.get(product_id)
    if not product:
        return jsonify({"error": "商品不存在"}), 404

    cart = session.setdefault('cart', [])
    for item in cart:
        if item['productId'] == product_id:
            item['quantity'] += quantity_change
            if item['quantity'] <= 0:
                cart.remove(item)
            session.modified = True
            return jsonify({"message": "購物車已更新"})

    if quantity_change > 0:
        cart.append({
            "productId": product.id,
            "productName": product.product_name,
            "price": product.product_prices,
            "quantity": quantity_change,
            "imageUrl": product.product_first_image
        })
        session.modified = True
        return jsonify({"message": "商品已加入購物車"})

    return jsonify({"error": "數量無效"}), 400


# 返回購物車資料 (JSON)
@app.route('/api/cart', methods=['GET'])
def get_cart():
    if 'cart' not in session:
        return jsonify([])
    return jsonify(session['cart'])

# 移除購物車商品
@app.route('/api/cart/remove', methods=['POST'])
def remove_from_cart():
    data = request.json
    if 'cart' in session:
        session['cart'] = [item for item in session['cart'] if item['productId'] != data['productId']]
        session.modified = True
    return jsonify({"message": "商品已移除"})

@app.route('/checkout', methods=['POST'])
def checkout():
    if 'cart' not in session:
        return jsonify({"error": "購物車為空"}), 400

    # 在這裡處理庫存扣減邏輯
    for item in session['cart']:
        product = Product.query.get(item['productId'])
        if product and product.product_in_stock >= item['quantity']:
            product.product_in_stock -= item['quantity']
        else:
            return jsonify({"error": f"商品 {item['productName']} 庫存不足"}), 400

    db.session.commit()
    session.pop('cart')  # 清空購物車
    return jsonify({"message": "結帳成功！"})

if __name__ == "__main__":
    app.run(debug=True)
