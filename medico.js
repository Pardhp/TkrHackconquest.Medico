function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let role = document.getElementById('role').value;
    
    if (username && password) {
        document.getElementById('loginPage').style.display = 'none';
        if (role === 'doctor') {
            document.getElementById('doctorDashboard').style.display = 'block';
        } else {
            document.getElementById('patientDashboard').style.display = 'block';
            document.getElementById('medicalHistory').innerHTML = '<p>Medical history data...</p>';
        }
    } else {
        alert('Please enter username and password');
    }
}

function logout() {
    document.getElementById('loginPage').style.display = 'block';
    document.getElementById('doctorDashboard').style.display = 'none';
    document.getElementById('patientDashboard').style.display = 'none';
}

function searchPatient() {
    let searchValue = document.getElementById('searchPatient').value;
    if (searchValue) {
        document.getElementById('patientInfo').innerHTML = '<p>Patient data for: ' + searchValue + '</p>';
    } else {
        alert('Please enter a patient name');
    }
}

function emergencyAccess() {
    document.getElementById('patientInfo').innerHTML = '<p>Emergency access granted: Basic patient data displayed.</p>';
}

function addMedicalRecord() {
    let medicalData = document.getElementById('medicalForm').value;
    if (medicalData) {
        alert('Medical record added successfully');
        document.getElementById('medicalForm').value = '';
    } else {
        alert('Please enter medical details');
    }
}
