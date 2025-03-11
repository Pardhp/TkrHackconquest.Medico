document.addEventListener("DOMContentLoaded", function () {
    // Initialize sample users if none exist
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([
            { username: "doc1", password: "pass123", role: "doctor" },
            { username: "patient1", password: "pass123", role: "patient", medicalHistory: [] }
        ]));
    }
});

function register() {
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let role = document.getElementById("newRole").value;

    if (!username || !password) {
        alert("Please enter a username and password!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    if (users.some(u => u.username === username)) {
        alert("Username already exists! Try another.");
        return;
    }

    let newUser = { username, password, role };
    if (role === "patient") {
        newUser.medicalHistory = []; // Ensure patients start with an empty medical history
    }

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    alert("Registration successful! You can now log in.");
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    let users = JSON.parse(localStorage.getItem("users"));

    let user = users.find(u => u.username === username && u.password === password && u.role === role);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Save logged-in user
        document.getElementById("loginPage").style.display = "none";

        if (role === "doctor") {
            document.getElementById("doctorDashboard").style.display = "block";
        } else {
            document.getElementById("patientDashboard").style.display = "block";
            displayMedicalHistory(user);
        }
    } else {
        alert("Invalid credentials!");
    }
}

function logout() {
    localStorage.removeItem("loggedInUser"); // Remove session data
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("doctorDashboard").style.display = "none";
    document.getElementById("patientDashboard").style.display = "none";
}

function displayMedicalHistory(user) {
    let historyDiv = document.getElementById("medicalHistory");
    historyDiv.innerHTML = "<h3>Your Medical History</h3>";

    if (user.medicalHistory.length === 0) {
        historyDiv.innerHTML += "<p>No records found.</p>";
    } else {
        user.medicalHistory.forEach(record => {
            historyDiv.innerHTML += `<p>${record}</p>`;
        });
    }
}

function searchPatient() {
    let searchValue = document.getElementById("searchPatient").value;
    let users = JSON.parse(localStorage.getItem("users"));
    let patient = users.find(u => u.username === searchValue && u.role === "patient");

    if (patient) {
        document.getElementById("patientInfo").innerHTML = `<p>Patient: ${patient.username}</p>
        <h3>Medical History</h3>${patient.medicalHistory.map(record => `<p>${record}</p>`).join("")}`;
    } else {
        alert("Patient not found!");
    }
}

function emergencyAccess() {
    let users = JSON.parse(localStorage.getItem("users"));
    let patient = users.find(u => u.role === "patient"); // Example: Access first patient

    if (patient) {
        document.getElementById("patientInfo").innerHTML = `<p>Emergency Access Granted</p>
        <p>Patient: ${patient.username}</p>
        <h3>Basic Data</h3><p>Some emergency info here...</p>`;
    } else {
        alert("No patients found!");
    }
}

function addMedicalRecord() {
    let medicalData = document.getElementById("medicalForm").value;
    let users = JSON.parse(localStorage.getItem("users"));

    if (!medicalData) {
        alert("Please enter medical details");
        return;
    }

    let patientName = prompt("Enter patient's username to add record:");
    let patient = users.find(u => u.username === patientName && u.role === "patient");

    if (patient) {
        patient.medicalHistory.push(medicalData);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Medical record added successfully!");
        document.getElementById("medicalForm").value = "";
    } else {
        alert("Patient not found!");
    }
}
