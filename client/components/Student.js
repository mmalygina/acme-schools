import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteStudent} from './../reducers/studentsReducer';
import {getStudentById} from './../store';
import {Link} from 'react-router-dom';
import StudentForm from './StudentForm';
import DeleteModal from './DeleteModal';

class Student extends Component{
    constructor(props){
        super(props);
        this.state = {
            studentToDelete: {}
        }
        this.setStudentToDelete = this.setStudentToDelete.bind(this);
        this.unStudentToDelete = this.unStudentToDelete.bind(this);
    }

    setStudentToDelete(student){
        this.setState({
            studentToDelete: student
        })
    }

    unStudentToDelete(){
        this.setState({
            studentToDelete: {}
        })
    }

    render() {
        const { student, deleteStudent, history, match } = this.props;
        const {setStudentToDelete, unSetStudentToDelete} = this;
        const {studentToDelete} = this.state;
        if(!student){
            return null;
        }
        return (
            <div className='studentContainer'>
                {
                    studentToDelete.id && (
                        <DeleteModal
                            confirm={deleteStudent}
                            unset={unSetStudentToDelete}
                            toDelete={student}
                            history={history}
                            body={`Deleting student will remove this student from the database`}
                        />
                    )
                }
                <Link to={`/students`}> Back </Link>
                <div >
                    <div>
                    <h2>
                    {student.firstName} {student.lastName} | GPA: {
                            student.gpa ? student.gpa : 'N/A'
                        }
                    </h2>
                    <button 
                    className='remove'
                    onClick={() => setStudentToDelete(student)}>
                        Delete
                    </button>
                    </div>
                        <StudentForm student={student} history={history} match={match}/>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state, {match, history}) => {
    const id = parseInt(match.params.id)
    return {
        student: getStudentById(state.students, id),
        match,
        history
    }
};

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        deleteStudent: (student) => dispatch(deleteStudent(student, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);
