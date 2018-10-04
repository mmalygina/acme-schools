import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getSchoolById} from './../store';

const StudentRow = ({student, school}) => {
    return (
    <tr>
        <td>
            <Link to={`/students/${student.id}`}>
                {student.firstName} {student.lastName}
            </Link>
        </td>
        <td>{student.gpa}</td>
        <td>
            {
                school ? <Link to={`/schools/${school.id}`}>{ school.name }</Link> : 'not enrolled'
            }
        </td>
    </tr>
    );
}

const mapStateToProps = ({schools}, {student}) => {
    return {
        school: getSchoolById(schools, student.schoolId),
        student
    };
};

export default connect(mapStateToProps)(StudentRow);