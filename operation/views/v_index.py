# -*- coding: utf-8 -*-

from flask import render_template, request, redirect
from . import views


@views.route('/')
@views.route('/index')
def index():
    return render_template("index.html")


