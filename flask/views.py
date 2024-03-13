from flask import render_template, request, jsonify, redirect, Flask, send_file
from flask_login import LoginManager, login_user, logout_user, current_user, login_required
from models import db, Users, Article, Comment
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(Users, int(user_id))

@app.get('/')
def index():
    return redirect('admin')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login/index.html')
    else:
        username = request.form.get('username')
        password = request.form.get('password')
        user = Users.query.filter_by(login=username).first()
        if user:
            if password == user.password:
                login_user(user)
                return redirect('admin')

        return 'Пользователя не существует или не верный пароль'

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect('login')

@app.route('/api/get-articles', methods=['POST'])
def get_articles():
    articles = Article.query.order_by(Article.id.desc()).all()

    return jsonify([{'id': article.id, 'title': article.title, 'description': article.description, 'author': article.author,
                     'created_at': article.created_at, 'image_file': article.image_file} for article in articles])

@app.route('/api/get-image/<int:article_id>')
def get_image(article_id):
    article = Article.query.get(article_id)
    if not article:
        return jsonify({'error': 'Article not found'}), 404

    file_extension = os.path.splitext(article.image_file)[-1].lower()

    if file_extension in ['.jpg', '.jpeg']:
        mimetype = 'image/jpeg'
    elif file_extension == '.png':
        mimetype = 'image/png'
    elif file_extension == '.gif':
        mimetype = 'image/gif'
    else:
        return jsonify({'error': 'Unsupported file format'}), 400

    return send_file(article.image_file, mimetype=mimetype)

@app.route('/api/get-article', methods=['POST'])
def get_article():
    id_article = request.get_json()['id_article']
    article = Article.query.filter_by(id=id_article).first()

    return jsonify({'id': article.id, 'title': article.title, 'description': article.description, 'author': article.author,
                     'created_at': article.created_at, 'image_file': article.image_file})

@app.route('/api/get-comments', methods=['POST'])
def get_comment():
    id_article = request.get_json()['id_article']
    comments = Comment.query.filter_by(article_id=id_article).order_by(Comment.id.desc()).all()

    return jsonify([comment.text for comment in comments])

@app.route('/api/create-comment', methods=['POST'])
def create_comment():
    data = request.get_json()
    id_article = data['id_article']
    text = data['text']
    new_comment = Comment(
        text=text,
        article_id=id_article
    )

    db.session.add(new_comment)
    db.session.commit()

    return jsonify({'status': 'ok'})


