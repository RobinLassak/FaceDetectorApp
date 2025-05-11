from flask import Blueprint, request, jsonify
from utils.file_io import save_data, load_data

delete_route = Blueprint("delete", __name__)

@delete_route.route("/delete-person/<int:person_id>", methods=["DELETE"])
def delete_person(person_id):
    data = load_data()
    original_count = len(data["people"])

    # Vyfiltruj osobu podle ID
    data["people"] = [p for p in data["people"] if p["id"] != person_id]

    if len(data["people"]) == original_count:
        return jsonify({"error": "Osoba nenalezena"}), 404

    save_data(data)
    return jsonify({"message": "Osoba smazána"}), 200