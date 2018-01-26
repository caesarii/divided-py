from models.todo import Todo
from api import *


main = Blueprint('api_todo', __name__)

Model = Todo


@main.route('/todo/all')
def todo_list():
    ms = Model.query.all()
    r = dict(
        success=True,
        data=[m.json() for m in ms],
    )
    return jsonify(r)
