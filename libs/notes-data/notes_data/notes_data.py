class NotesData:
  def __init__(self):
    self.notes = [{
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
    }]

  def addNote(self, note):
    self.notes.append(note)
  
  def getNotes(self):
    return self.notes