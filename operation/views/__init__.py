# -*- coding: utf-8 -*-

from flask import redirect, Blueprint
views = Blueprint('views', __name__)


@views.route('/favicon.ico')
def favicon():
    return redirect("/static/images/favicon.ico")



from . import v_index
from . import v_error
from . import v_scoring



