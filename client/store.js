import { createStore, applyMiddleware , combineReducers} from 'redux';
import loggerMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import schoolsReducer from './reducers/schoolsReducer';
import studentsReducer from './reducers/studentsReducer';

const getStudentCountBySchool = (state) => {
    const { students } = state;
    return id => students.filter(e => e.schoolId == id).length;
}

const getSchoolById = (schools, id) => schools.find(e => e.id === id);
const getStudentById = (students, id) => students.find(e => e.id === id);

const getEnrolledStudents = (students, id) => students.filter(e => e.schoolId === id);
const getUnenrolledStudents = (students, id) => students.filter(e => e.schoolId !== id);

const reducer = combineReducers({
    schools: schoolsReducer,
    students: studentsReducer
});

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunk));

export default store;
export { 
    getStudentCountBySchool,
    getSchoolById,
    getStudentById,
    getEnrolledStudents,
    getUnenrolledStudents
}