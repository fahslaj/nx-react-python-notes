from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

notes = [
    {
        "id": 1,
        "title": "Note 1",
        "color": "#fef9c3"
    }, {
        "id": 2,
        "title": "Note 2",
        "color": "#bbf7d0"
    }, {
        "id": 3,
        "title": "Note 3",
        "color": "#bfdbfe"
    }
]

@app.route("/api/notes", methods=["GET"])
def getNotes():
    return jsonify(notes)

@app.route("/api/notes", methods=["POST"])
def createNote():
    data = request.get_json()
    note = {
        "id": len(notes) + 1,
        "title": data["title"],
        "color": data["color"]
    }
    notes.append(note)
    return jsonify(note)

if __name__ == "__main__":
    app.run(debug=True)