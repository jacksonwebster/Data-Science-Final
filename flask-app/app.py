from flask import Flask, request
from main import predict_for_interactive


app = Flask(__name__)


@app.route('/predict', methods=["GET"])
def getPrediction():
    minTemp = int(request.args.get('min'))
    maxTemp = int(request.args.get('max'))
    return {"crimes": predict_for_interactive(minTemp, maxTemp)}
