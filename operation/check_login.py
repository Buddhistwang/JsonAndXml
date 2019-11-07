# -*- coding: utf-8 -*-

import re
from flask import  render_template
from . import app


@app.before_request
def before_request():
    pass


# define 404
@app.errorhandler(404)
def page_not_found(error):
    return render_template('error/404.html'), 404


# define 500
@app.errorhandler(500)
def has_no_permission(error):
    return render_template('error/404.html'), 500


@app.template_global('encodeURIComponent')
def encode_url_component(p_str):
    def replace(match):
        return "%" + hex(ord(match.group()))[2:].upper()
    return re.sub(r"([^0-9A-Za-z!'()*\-._~])", replace, p_str.encode('utf-8'))
