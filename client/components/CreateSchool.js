import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SchoolForm from './SchoolForm';

const CreateSchool = ({history}) => {
        return (
            <div className='createSchoolContainer'>
                <Link to={`/schools`}> Back </Link>
                <SchoolForm history={history}/>
            </div>
        )
};

const mapStateToProps = (state, {history}) => {
    return {
        history
    }
};

export default connect(mapStateToProps)(CreateSchool);
