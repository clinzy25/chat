# pylint: disable=missing-function-docstring
from flask import Flask
from flask_socketio import SocketIO, send
from flask_cors import CORS
from flask import jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from model import query_add_message, query_get_messages


app = Flask(__name__)
CORS(app)
app.debug = True

socketio = SocketIO(app, cors_allowed_origins='*')

cred = credentials.Certificate('../firebase-key.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

messages_ref = db.collection('messages')

@app.route("/messages", methods=['GET'])
def get_messages():
    initial_messages = query_get_messages(messages_ref)
    return jsonify(initial_messages)

@socketio.on("message")
def handle_message(msg):
    query_add_message(messages_ref, msg)
    send(msg, broadcast=True)
    return None

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=int(8001))
