import {
    GET_STUDENTS,
    DELETE_STUDENT,
    UPDATE_STUDENT,
    ADD_STUDENT,
    _deleteStudent,
    _updateStudent,
    _addStudent,
    _getStudents } from './../actions';
import axios from 'axios';

const updateStudent = (student, history) => {
    if(student.gpa===''){
        student.gpa = null
    }
    if(student.schoolId===''){
        student.schoolId = null
    }
    return (dispatch) => {
        return axios.put(`/api/students/${student.id}`, student)
            .then(res => res.data)
            .then(student => dispatch(_updateStudent(student)))
            .then(() => history.goBack())
    }
}

const addStudent = (student, history) => {
    if(student.gpa===''){
        student.gpa = null
    }
    if(student.schoolId===''){
        student.schoolId = null
    }
    return (dispatch) => {
        return axios.post(`/api/students`, student)
            .then(res => res.data)
            .then(student => dispatch(_addStudent(student)))
            .then(() => history.goBack())
    }
}

const deleteStudent = (student, history) => {
    return (dispatch) => {
        dispatch(_deleteStudent(student));
        return axios.delete(`/api/students/${student.id}`)
            .then(()=> history.goBack())
    }
}

const getStudents = () => {
    return (dispatch) => {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => dispatch(_getStudents(students)))
    }
}

const studentsReducer = (state = [], action) => {
    switch(action.type){
        case GET_STUDENTS:
            return action.students;
        case DELETE_STUDENT:
            return state.filter(student => student.id != action.student.id);
        case UPDATE_STUDENT:
            return state.map(student => {
                return student.id === action.student.id ? action.student : student;
            })
        case ADD_STUDENT:
            return [ ...state, action.student];     
        default: return state
    }
}

const unenrollStudent = (student) => {
    const _student = {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        gpa: student.gpa,
        schoolId: null
    }
    return (dispatch) => {
        return axios.put(`/api/students/${student.id}`, _student)
            .then(res => res.data)
            .then(_student => dispatch(_updateStudent(_student)))}
}

const enrollStudent = (student, _schoolId) => {
    student.schoolId = _schoolId;
    return (dispatch) => {
        return axios.put(`/api/students/${student.id}`, student)
            .then(res => res.data)
            .then(_student => dispatch(_updateStudent(_student)))}
}

export default studentsReducer;
export { 
    getStudents,
    deleteStudent,
    updateStudent,
    addStudent,
    unenrollStudent,
    enrollStudent
}