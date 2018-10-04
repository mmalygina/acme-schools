import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ schools, students, path }) => {
    const selected = _path => _path ===path
    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'><Link to='/schools' className={`nav-link ${selected('/schools') ? 'active': ''}`}>Schools ({ schools.length })</Link></li>
            <li className='nav-item'><Link to='/students' className={`nav-link ${selected('/students') ? 'active': ''}`}>Students ({ students.length })</Link></li>
            <li className='nav-item'><Link to='/students/create' className={`nav-link ${selected('/students/create') ? 'active': ''}`}>Add NewStudent</Link></li>
            <li className='nav-item'><Link to='/schools/create' className={`nav-link ${selected('/schools/create') ? 'active': ''}`}>Add New School</Link></li>
        </ul>
    )
}

const mapStatetoProps = ({ schools, students }, {path}) => {
    return {
        schools,
        students,
        path
    }
}

export default connect(mapStatetoProps)(Nav);