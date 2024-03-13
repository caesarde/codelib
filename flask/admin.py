from flask_admin import Admin, AdminIndexView, expose
from views import app
from models import Article, db
from flask_login import current_user
from flask import redirect, request
from flask_admin.contrib.sqla import ModelView
from werkzeug.utils import secure_filename
import os
from flask_admin.form.upload import FileUploadField
from functools import wraps
import time

def custom_login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

class DashBoardView(AdminIndexView):

    @expose('/')
    @custom_login_required
    def index(self):
        return self.render('admin/dashboard_index.html')

class ArticleAdminView(ModelView):
    column_list = ['title', 'description', 'author', 'image_file']

    form_extra_fields = {
        'image_file': FileUploadField('Image', base_path='static',
                                       allowed_extensions=['jpg', 'jpeg', 'png'])
    }

    def on_model_change(self, form, model, is_created):
        if 'image_file' in request.files and request.files['image_file']:
            image_file = request.files['image_file']
            filename = secure_filename(image_file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            # if os.path.exists(filepath):
            #     os.remove(filepath)
            # image_file.save(filepath)
            model.image_file = filepath

admin = Admin(app, name='Админка', template_mode='bootstrap3', index_view=DashBoardView(), endpoint='admin')

