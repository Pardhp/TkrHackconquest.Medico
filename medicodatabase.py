from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Sample patient records stored in a dictionary
patients = {
    "John Doe": {
        "Age": 30,
        "Blood Group": "O+",
        "Conditions": ["Diabetes", "Hypertension"],
        "Medications": ["Metformin", "Lisinopril"]
    },
    "Jane Smith": {
        "Age": 25,
        "Blood Group": "A-",
        "Conditions": ["Asthma"],
        "Medications": ["Albuterol"]
    },
     "nitish": {
        "Age": 18,
        "Blood Group": "AB+",
        "Conditions": ["Diabetes", "Hypertension"],
        "Medications": ["Metformin", "Lisinopril"]
    },
    "pardhu": {
        "Age": 18,
        "Blood Group": "A-",
        "Conditions": ["Asthma"],
        "Medications": ["Albuterol"]
    },
    "karthikeya": {
        "Age": 18,
        "Blood Group": "A+",
        "Conditions": ["Asthma"],
        "Medications": ["Albuterol"]
    },
    "roy": {
        "Age": 18,
        "Blood Group": "o+",
        "Conditions": ["diabeties"],
        "Medications": ["Albuterol"]
    }

}

@app.route('/')
def index():
    return render_template('medico.html')

@app.route('/get_patient', methods=['POST'])
def get_patient():
    data = request.json # Get JSON data from frontend
    name = data.get('name') # Extract patient name

    if name in patients:
        return jsonify({"status": "success", "data": patients[name]})
    else:
        return jsonify({"status": "error", "message": "Patient not found"})

if __name__ == '__main__':
    app.run(debug=True)
