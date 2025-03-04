
//Functions that does all the work done in the student is in the studentController file

export function getAllStudents(req, res) {
    res.json({
        message: "All Students"
    })
}

export function saveStudent(req, res) {
    res.json({
        message: "New Student Saved"
    })
}

export function updateStudent(req, res) {
    res.json({
        message: "Student Updated"
    })
}

export function deleteStudent(req, res) {
    res.json({
        message: "Student Deleted"
    })
}