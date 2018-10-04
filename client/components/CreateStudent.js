import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import StudentForm from './StudentForm';

const CreateStudent = ({history, match}) => {
        return (
            <div className='createStudentContainer'>
                <Link to={`/students`}> Back </Link>
                <StudentForm history={history} match={match}/>
            </div>
        )
};

const mapStateToProps = (state, {history}) => {
    return {
        history
    }
};

export default connect(mapStateToProps)(CreateStudent);
