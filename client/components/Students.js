import React from 'react';
import {connect} from 'react-redux';
import StudentRow from './StudentRow';

const Students = ({ students }) => {
    return (
        <div className='studentsContainer'>
        <h2>List of all students: </h2>
        <table className='student-list'>
            <tbody>
              <tr>
                <th>NAME</th>
                <th>GPA</th>
                <th>SCHOOL</th>
              </tr>
              {
                students.map((student) => {
                  return <StudentRow key={student.id} student={student}/>
                })
              }
            </tbody>
          </table>
          </div>
    )
};

const mapStateToProps = (state) => {
    return {
        students: state.students
    };
};

export default connect(mapStateToProps)(Students);