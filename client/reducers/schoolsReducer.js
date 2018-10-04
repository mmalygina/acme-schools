import {
    GET_SHCOOLS,
    DELETE_SCHOOL,
    UPDATE_SCHOOL,
    ADD_SCHOOL,
    _deleteSchool,
    _updateSchool,
    _addSchool,
    _getSchools } from './../actions';
import axios from 'axios';

const updateSchool = (school, history) => {

    return (dispatch) => {
        return axios.put(`/api/schools/${school.id}`, school)
            .then(res => res.data)
            .then(school => dispatch(_updateSchool(school)))
            .then(() => history.push(`/schools`))
    }
}

const addSchool = (school, history) => {
    return (dispatch) => {
        return axios.post(`/api/schools`, school)
            .then(res => res.data)
            .then(school => dispatch(_addSchool(school)))
            .then(() => history.push(`/schools`))
    }
}

const deleteSchool = (school, history) => {
    return (dispatch) => {
        dispatch(_deleteSchool(school));
        return axios.delete(`/api/schools/${school.id}`)
            .then(() => history.push(`/schools`))
    }
}

const getSchools = () => {
    return (dispatch) => {
        return axios.get('/api/schools')
            .then(res => res.data)
            .then(schools => dispatch(_getSchools(schools)));
    }
}

const schoolsReducer = (state = [], action) => {
    switch(action.type){
        case GET_SHCOOLS:
            return action.schools;
        case DELETE_SCHOOL:
            return state.filter(school => school.id != action.school.id);
        case UPDATE_SCHOOL:
            return state.map(school => {
                if(school.id === action.school.id) return action.school;
                return school;
            })
        case ADD_SCHOOL:
            return [ ...state, action.school];     
        default: return state;
    }
}

export default schoolsReducer;
export { 
    getSchools,
    deleteSchool,
    updateSchool,
    addSchool
}