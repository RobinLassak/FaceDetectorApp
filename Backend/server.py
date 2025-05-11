from flask import Flask
from flask_cors import CORS

from routes.add_person import add_person_route
from routes.get_people import get_people_route
from routes.edit_person import edit_route
from routes.delete_person import delete_route

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return 'Server bezi'

# Registrace rout
app.register_blueprint(add_person_route)
app.register_blueprint(get_people_route)
app.register_blueprint(edit_route)
app.register_blueprint(delete_route)

if __name__ == '__main__':
    app.run(debug=True)