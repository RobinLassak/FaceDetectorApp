from flask import Blueprint, request, jsonify
from utils.file_io import load_data, save_data

add_person_route = Blueprint('add_person', __name__)

@add_person_route.route('/add-person', methods=['POST'])
def add_person():
    person = request.get_json()
    print('Prijata data:', person)
    data = load_data()
    data['people'].append(person)
    data['people'].sort(key=lambda p: p['id'])
    save_data(data)
    return jsonify({"message": "Person added successfully"}), 201