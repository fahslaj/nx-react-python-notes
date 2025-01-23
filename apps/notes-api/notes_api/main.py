from flask import Flask, jsonify, request
from notes_data import NotesData
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})

notes = NotesData()

@app.route("/api/notes", methods=["GET"])
def getNotes():
    return jsonify(notes.getNotes())

@app.route("/api/notes", methods=["POST"])
def createNote():
    data = request.get_json()
    note = {
        "title": data["title"],
        "color": data["color"]
    }
    return jsonify(notes.addNote(note))

@app.route("/api/notes/<int:id>", methods=["DELETE"])
def deleteNote(id):
    notes.deleteNoteById(id)
    return jsonify({"message": "Note deleted"})

if __name__ == "__main__":
    app.run(debug=True)