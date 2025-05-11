from flask import Blueprint, request, jsonify
from utils.file_io import load_data, save_data

edit_route = Blueprint("edit", __name__)

@edit_route.route("/edit-person/<int:person_id>", methods=["PUT"])
def edit_person(person_id):
    updated_data = request.get_json()
    print("Úprava osoby ID:", person_id)
    print("Nová data:", updated_data)

    data = load_data()
    found = False

    for i, person in enumerate(data["people"]):
        if person["id"] == person_id:
            data["people"][i] = updated_data
            found = True
            break

    if not found:
        return jsonify({"error": "Osoba nenalezena"}), 404

    save_data(data)
    return jsonify({"message": "Osoba upravena"}), 200