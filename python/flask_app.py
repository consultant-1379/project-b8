from flask import Flask, request, redirect
from flask_cors import CORS

from directory_scan import get_directories
from py_to_mongodb import write_data_to_db, connect_to_db

app = Flask(__name__)
CORS(app)


@app.route('/data', methods=['POST'])
def add_github_data():
    path_to_repo = request.json['url']
    print("getting data for {} ..".format(path_to_repo))
    return write_data_to_db(str(path_to_repo), "mongodb://mongo:27017/", "Team2db")


if __name__ == "__main__":
    connect_to_db("mongodb://mongo:27017/", "Team2db")
    print("connected to database")
    print("Scanning for pre-load data")
    for path in get_directories("./repos"):
        write_data_to_db(path, "mongodb://mongo:27017/", "Team2db")
    app.run(debug=True, host="0.0.0.0")
