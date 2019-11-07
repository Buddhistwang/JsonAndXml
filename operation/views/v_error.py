# -*- coding: utf-8 -*-

from flask import render_template
from . import views


@views.route('/error/404', methods=['GET'])
def error_404():
    return render_template('/error/404.html', **locals())


@views.route('/error/deny', methods=['GET'])
def error_deny():
    return render_template('/error/deny.html', **locals())
