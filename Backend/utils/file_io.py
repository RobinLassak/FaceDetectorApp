import json
import os

data_path = '../Frontend/FaceDetectorApp/src/DatabaseOfPeople.json'

# Funkce pro nacteni dat z json file.
def load_data():
    if os.path.exists(data_path):
        with open(data_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    else:
        return {'people': []}
    
# Funkce pro zapis dat
def save_data(data):
    with open(data_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)