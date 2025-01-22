from flask import Flask

app = Flask(__name__)

@app.route("/api/hello")
def hello_world():
    return "Hello from Python API!"

if __name__ == "__main__":
    app.run(debug=True)