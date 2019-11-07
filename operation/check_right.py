# -*- coding: utf-8 -*-

from flask import session
from . import app




@app.template_global('get_role_name')
def get_role_name():
    if 'username' not in session:
        return ''
