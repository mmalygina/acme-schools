import React from 'react';
import {connect} from 'react-redux';
import SchoolRow from './SchoolRow';

const Schools = ({ schools }) => {
    return (
        <div className='schoolsContainer'>
            <h2>List of active schools: </h2>
            <table className='student-list'>
            <tbody>
              <tr>
                <th>School Name </th>
                <th>School Address </th>
                <th>School description </th>
                <th>Num. of Students Enrolled </th>
              </tr>
              {
                schools.map((school) => {
                  return <SchoolRow key={school.id} school={school}/>
                })
              }
            </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = ({schools}) => {
    return {
        schools
    }
}

export default connect(mapStateToProps)(Schools);