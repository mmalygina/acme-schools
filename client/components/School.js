import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteSchool} from './../reducers/schoolsReducer';
import {getSchoolById, getUnenrolledStudents, getEnrolledStudents} from '../store';
import {unenrollStudent, enrollStudent} from './../reducers/studentsReducer';
import SchoolForm from './SchoolForm';
import DeleteModal from './DeleteModal'

class School extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.school ? this.props.school.id : null,
            name: this.props.school ? this.props.school.name : '',
            address: this.props.school ? this.props.school.address : '',
            description: this.props.school ? this.props.school.description : '',
            schoolToDelete: {}
        }
        this.setSchoolToDelete = this.setSchoolToDelete.bind(this);
        this.unSetSchoolToDelete = this.unSetSchoolToDelete.bind(this);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.school && this.props.school){
            this.setState({
                id: this.props.school.id,
                name: this.props.school.name,
                address: this.props.school.address,
                description: this.props.school.description
            })
        }
    }

    setSchoolToDelete(school){
        this.setState({
            schoolToDelete: school
        })
    }

    unSetSchoolToDelete(){
        this.setState({
            schoolToDelete: {}
        })
    }

    render() {
        const {students, unenrolled, enrollStudent, unenrollStudent, school, deleteSchool, history} = this.props;
        const {schoolToDelete} = this.state;
        const {setSchoolToDelete, unSetSchoolToDelete} = this;
        return (
            <div className='schoolContainer'>
            {
                schoolToDelete.id && (
                    <DeleteModal
                        confirm={deleteSchool}
                        unset={unSetSchoolToDelete}
                        toDelete={school}
                        history={history}
                        body={`Deleting school will result in enrolled students being unenrolled from this school`}
                    />
                )
            }
                <Link to={`/schools`}> Back </Link>
                <h2>{school.name} | Num. of Enrolled Students: {students.length}</h2>
                <button className='remove'
                    onClick={() => setSchoolToDelete(school)}>
                        Delete School
                </button>
                <div className='school'>
                    <SchoolForm school={school} history={history}/>
                </div>
                <div className='enrolled-students-list'>
                    <h3>Students enrolled: {students.length}</h3>
                    <hr />
                        {
                            students.map(student => (
                                <li key={student.id}>
                                    {student.firstName} {student.lastName}
                                    <button 
                                        style={{float: 'right'}}
                                        className='remove'
                                        onClick={() => unenrollStudent(student)}
                                    >
                                    x
                                    </button>
                                </li>
                            ))
                        }
                </div>
                <div className='unenrolled-students-list'>
                    <h3>Students available for enrollment: {unenrolled.length}</h3>
                    <span>(* both unenrolled and enrolled in other schools)</span>
                    <hr />
                    <div>
                        {
                            unenrolled.map(student => (
                                <li key={student.id}>
                                    {student.firstName} {student.lastName}
                                    <button
                                        style={{float: 'right'}}
                                        className='add'
                                        onClick={() => enrollStudent(student, school.id)}
                                    >
                                    +
                                    </button>
                                </li>
                            ))
                        }
                    </div> 
                </div>
                <Link to={`/students/create/${school.id}`}>
                    <button className='create'>Enroll New Student</button>
                </Link>
            </div>
        )
    }
}


const mapStateToProps = (state, {match}) => {
    const schoolId = parseInt(match.params.id);
    return {
        school: getSchoolById(state.schools, schoolId),
        students: getEnrolledStudents(state.students, schoolId),
        unenrolled: getUnenrolledStudents(state.students, schoolId)
    }
};

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        deleteSchool: (school) => dispatch(deleteSchool(school, history)),
        unenrollStudent: (studentId) => dispatch(unenrollStudent(studentId)),
        enrollStudent: (studentId, schoolId) => dispatch(enrollStudent(studentId, schoolId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
