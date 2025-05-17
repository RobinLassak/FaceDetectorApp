import face_recognition
import json
import os

pose_predictor_model_location = os.path.join(
    "D:/Programování/Projects/FaceDetectorApp/venv/Lib/site-packages/face_recognition_models/models", 
    "shape_predictor_68_face_landmarks.dat"
)
print("Model path:", pose_predictor_model_location)
print("Exists:", os.path.exists(pose_predictor_model_location))

try: 

    image_path = "./Foto/Ja.jpg"
    image = face_recognition.load_image_file(image_path)

    biometric_data = face_recognition.face_encodings(image)

    listOfBiometric = [oneBiometric.tolist() for oneBiometric in biometric_data]

    with open("Face_Data.json", "w") as json_file:
        json.dump(listOfBiometric, json_file)

    if len(listOfBiometric) < 1: print("Nebyl rozpoznan zadny oblicej")
    
    elif len(listOfBiometric) == 1: print(f"{len(listOfBiometric)} byl rozpoznan a ulozen do json_file")

    elif len(listOfBiometric) > 1 and {len(listOfBiometric)} < 5 : print(f"len{listOfBiometric} byly rozpoznany a ulozen do json_file")

    else: print(f"{len(listOfBiometric)} bylo rozpoznano a ulozen do json_file") 

except Exception as e:
    print(f"Nastala chyba {e}")
    

    
