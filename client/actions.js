export const GET_SHCOOLS = 'GET_SHCOOLS';
export const GET_STUDENTS = 'GET_STUDENTS';
export const DELETE_STUDENT = 'DELETE_STUDENT';
export const DELETE_SCHOOL = 'DELETE_SCHOOL';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const ADD_STUDENT = 'ADD_STUDENT';
export const UPDATE_SCHOOL = 'UPDATE_SCHOOL';
export const ADD_SCHOOL = 'ADD_SCHOOL';

export const _addStudent = (student) => {
    return {
        type: ADD_STUDENT,
        student
    }
}

export const _updateStudent = (student) => {
    return {
        type: UPDATE_STUDENT,
        student
    }
}

export const _getStudents = (students) => {
    return {
        type: GET_STUDENTS,
        students
    }
}

export const _deleteStudent = (student) => {
    return {
        type: DELETE_STUDENT,
        student
    }
}

export const _deleteSchool = (school) => {
    return {
        type: DELETE_SCHOOL,
        school
    }
}

export const _updateSchool = (school) => {
    return {
        type: UPDATE_SCHOOL,
        school
    }
}

export const _addSchool = (school) => {
    return {
        type: ADD_SCHOOL,
        school
    }
}

export const _getSchools = (schools) => {
    return {
        type: GET_SHCOOLS,
        schools
    }
}
