class NotesData:
    def __init__(self):
        self.notes = [{
            "id": 1,
            "title": "Note 1",
            "color": "yellow"
        }, {
            "id": 2,
            "title": "Note 2",
            "color": "green"
        }, {
            "id": 3,
            "title": "Note 3",
            "color": "blue"
        }]
        self.nextId = len(self.notes) + 1

    def addNote(self, note):
        newNote = {
            "id": self.nextId,
            "title": note["title"],
            "color": note["color"]
        }
        self.notes.append(newNote)
        self.nextId += 1
        return newNote

    def getNotes(self):
        return self.notes

    def deleteNoteById(self, id):
        self.notes = [note for note in self.notes if note["id"] != id]
