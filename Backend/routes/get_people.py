from flask import Blueprint, jsonify
from utils.file_io import load_data

get_people_route = Blueprint('get_people', __name__)

@get_people_route.route('/people')
def get_people():
    data = load_data()
    print(data)
    return jsonify(data)