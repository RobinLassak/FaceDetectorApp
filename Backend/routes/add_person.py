import os
import uuid
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from utils.file_io import load_data, save_data


UPLOAD_FOLDER = 'PersonsPhoto'  # složka, kde budou uloženy fotky
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

add_person_route = Blueprint('add_person', __name__)

@add_person_route.route('/add-person', methods=['POST'])
def add_person():
    try:
        # Získání JSON dat a souboru z multipart/form-data
        person_json = request.form.get("person")
        photo_file = request.files.get("photo")

        if not person_json or not photo_file:
            return jsonify({"error": "Missing data"}), 400

        import json
        person = json.loads(person_json)

        # Uložení souboru s jedinečným názvem
        filename = secure_filename(photo_file.filename)
        unique_filename = f"{uuid.uuid4().hex}_{filename}"
        filepath = os.path.join(UPLOAD_FOLDER, unique_filename)
        photo_file.save(filepath)

        # Vytvoření trvalé cesty pro uložení do JSON
        photo_url = f"/{filepath}"

        # Přidání URL obrázku k datům osoby
        person["photo"] = photo_url

        
        data = load_data()
        data['people'].append(person)
        data['people'].sort(key=lambda p: p['id'])
        save_data(data)

        return jsonify(person), 201

    except Exception as e:
        print("Chyba při přidávání osoby:", str(e))
        return jsonify({"error": "Server error"}), 500