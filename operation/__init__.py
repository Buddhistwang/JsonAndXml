# -*- coding: utf-8 -*-

from flask import Flask

app = Flask(__name__, static_url_path='')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SECRET_KEY'] = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

from . import check_right
from . import check_login

from .api import api as api_blueprint
app.register_blueprint(api_blueprint)


from .views import views as views_blueprint
app.register_blueprint(views_blueprint)
