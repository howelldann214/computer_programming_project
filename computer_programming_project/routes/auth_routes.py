from flask import Blueprint, request, jsonify

# 定義 Blueprint
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 實現註冊邏輯
    return jsonify({"message": "註冊成功"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # 實現登入邏輯
    return jsonify({"message": "登入成功"}), 200
