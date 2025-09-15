const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('studentsTableBody');

// Load students from localStorage when page loads
document.addEventListener('DOMContentLoaded', loadStudentsFromStorage);

studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNumber').value.trim();

    // Validate inputs
    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert('Name must contain only letters.');
        return;
    }
    if (!/^\d+$/.test(studentId)) {
        alert('Student ID must contain only numbers.');
        return;
    }
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (!/^\d{10,}$/.test(contact)) {
        alert('Contact Number must contain at least 10 digits.');
        return;
    }

    const student = { name, studentId, email, contact };

    addStudentToTable(student);
    saveStudentToStorage(student);

    studentForm.reset();
});

function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
}

function addStudentToTable(student) {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.studentId}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);
}

function saveStudentToStorage(student) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
}

function loadStudentsFromStorage() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.forEach(student => addStudentToTable(student));
}

function deleteStudent(button) {
    const row = button.closest('tr');
    const studentId = row.cells[1].innerText;

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.studentId !== studentId);

    localStorage.setItem('students', JSON.stringify(students));

    row.remove();
}

function editStudent(button) {
    const row = button.closest('tr');
    document.getElementById('studentName').value = row.cells[0].innerText;
    document.getElementById('studentId').value = row.cells[1].innerText;
    document.getElementById('email').value = row.cells[2].innerText;
    document.getElementById('contactNumber').value = row.cells[3].innerText;

    deleteStudent(button);
}
