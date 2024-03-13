from views import app
from models import db, Article
from admin import admin, ArticleAdminView
from flask_migrate import Migrate


app.config.from_object('config.Config')

db.init_app(app)
migrate = Migrate()
migrate.init_app(app, db)
admin.add_view(ArticleAdminView(Article, db.session, name='Статьи'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
