import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load the existing potholes from the JSON file
def load_potholes():
    try:
        with open('D:/pothole detection/potholes.json', 'r') as file:
            potholes = json.load(file)
    except FileNotFoundError:
        potholes = []
    return potholes

# Save new potholes to the JSON file
def save_potholes(potholes):
    with open('D:/pothole detection/potholes.json', 'w') as file:
        json.dump(potholes, file, indent=4)

@app.route('/add_pothole', methods=['POST'])
def add_pothole():
    # Get JSON data from the request
    data = request.get_json()

    # Ensure that the data contains 'latitude' and 'longitude'
    if 'latitude' not in data or 'longitude' not in data:
        return jsonify({"error": "Latitude and Longitude are required"}), 400

    latitude = data['latitude']
    longitude = data['longitude']

    # Load the existing potholes from potholes.json
    potholes = load_potholes()

    # Generate a new id for the pothole
    new_id = len(potholes) + 1

    # Add the new pothole to the list
    new_pothole = {
        "id": new_id,
        "latitude": latitude,
        "longitude": longitude
    }
    potholes.append(new_pothole)

    # Save the updated list of potholes back to the JSON file
    save_potholes(potholes)

    # Respond with a success message
    return jsonify({"message": "Pothole added successfully", "pothole": new_pothole}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0' ,port=5000)

