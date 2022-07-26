from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from flask import jsonify
from model import messages

app = Flask(__name__)
CORS(app)
app.debug = True

socketio = SocketIO(app)

@app.route("/messages", methods=['GET'])
def get_messages():
    return jsonify(messages)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=int(8000))
