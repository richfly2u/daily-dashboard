"""
Daily Dashboard Sync Backend
Deploy to Render as a web service
"""
import json, os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATA_FILE = os.environ.get("DATA_FILE", "/tmp/dashboard_data.json")

def load_all():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return {}

def save_all(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, ensure_ascii=False)

@app.route("/")
def home():
    return jsonify({"status": "ok", "message": "Daily Dashboard API"}), 200

@app.route("/api/data/<board_key>", methods=["GET"])
def get_board(board_key):
    data = load_all()
    board = data.get(board_key, {})
    return jsonify({"key": board_key, "days": board}), 200

@app.route("/api/data/<board_key>/<date_str>", methods=["GET", "PUT"])
def handle_day(board_key, date_str):
    data = load_all()
    if board_key not in data:
        data[board_key] = {}
    
    if request.method == "GET":
        day = data[board_key].get(date_str, {})
        return jsonify({"key": board_key, "date": date_str, "data": day}), 200
    
    elif request.method == "PUT":
        body = request.get_json(force=True, silent=True) or {}
        data[board_key][date_str] = body
        save_all(data)
        return jsonify({"status": "saved"}), 200

@app.route("/api/data/<board_key>/batch", methods=["PUT"])
def batch_save(board_key):
    data = load_all()
    if board_key not in data:
        data[board_key] = {}
    body = request.get_json(force=True, silent=True) or {}
    data[board_key].update(body)
    save_all(data)
    return jsonify({"status": "saved", "count": len(body)}), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
