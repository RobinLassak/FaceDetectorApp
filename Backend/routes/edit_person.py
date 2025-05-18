import os
import uuid
import json
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from utils.file_io import load_data, save_data

edit_route = Blueprint("edit", __name__)
UPLOAD_FOLDER = os.path.join("static", "PersonsPhoto")


@edit_route.route("/edit-person/<int:person_id>", methods=["PUT"])
def edit_person(person_id):
    try:
        person_json = request.form.get("person")
        photo_file = request.files.get("photo")

        if not person_json:
            return jsonify({"error": "Chybí data osoby"}), 400

        updated_data = json.loads(person_json)
        data = load_data()
        people = data.get("people", [])
        found = False

        for i, person in enumerate(people):
            if person["id"] == person_id:
                found = True

                if photo_file:
                    filename = secure_filename(photo_file.filename)
                    unique_filename = f"{uuid.uuid4().hex}_{filename}"
                    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
                    photo_path = os.path.join(UPLOAD_FOLDER, unique_filename)
                    photo_file.save(photo_path)

                    # Smazání staré fotky, pokud existuje
                    old_photo = person.get("photo")
                    if old_photo and "/static/PersonsPhoto/" in old_photo:
                        old_file_path = os.path.join(".", old_photo.lstrip("/").replace("/", os.sep))
                        if os.path.isfile(old_file_path):
                            try:
                                os.remove(old_file_path)
                                print(f"Smazána stará fotka: {old_file_path}")
                            except Exception as e:
                                print(f"Chyba při mazání staré fotky: {e}")

                    # Uložení nové cesty
                    updated_data["photo"] = f"/static/PersonsPhoto/{unique_filename}".replace("\\", "/")
                else:
                    # Zachovat původní fotku
                    updated_data["photo"] = person.get("photo")

                people[i] = updated_data
                break

        if not found:
            return jsonify({"error": "Osoba nenalezena"}), 404

        data["people"] = people
        save_data(data)
        return jsonify(updated_data), 200

    except Exception as e:
        print("Chyba při úpravě osoby:", e)
        return jsonify({"error": "Chyba serveru"}), 500