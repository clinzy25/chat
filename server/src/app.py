from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS
from flask import jsonify
from model import messages

app = Flask(__name__)
CORS(app)
app.debug = True

socketio = SocketIO(app, cors_allowed_origins='*')

@app.route("/messages", methods=['GET'])
def get_messages():
    return jsonify(messages)

@socketio.on("message")
def handleMessage(msg):
    print(msg)
    send(msg, broadcast=True)
    return None

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=int(8001))
