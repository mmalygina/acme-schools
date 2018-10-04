import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getStudentCountBySchool} from './../store';

const SchoolRow = ({school, studentsCount}) => {
    return (
    <tr>
        <td>
            <Link to={`/schools/${school.id}`}>{school.name}</Link>
        </td>
        <td>{school.address}</td>
        <td>{school.description}</td>
        <td>{studentsCount(`${school.id}`)}</td>
    </tr>
    );
}

const mapStateToProps = (state, {school}) => {
    return {
        studentsCount: getStudentCountBySchool(state),
        school
    };
};

export default connect(mapStateToProps)(SchoolRow);