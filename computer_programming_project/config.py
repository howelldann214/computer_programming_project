import os

# 基本設定
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = 'your_secret_key'  # 設定加密金鑰
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'project.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False