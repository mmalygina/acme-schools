import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateStudent, addStudent} from './../reducers/studentsReducer';
import {getSchoolById} from './../store';

class StudentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.student ? this.props.student.id : null,
            firstName: this.props.student ? this.props.student.firstName : '',
            lastName: this.props.student ? this.props.student.lastName : '',
            gpa: this.props.student && this.props.student.gpa ? this.props.student.gpa : '',
            schoolId: this.props.student ? this.props.student.schoolId : '',
            fieldError: false,
            gpaFieldError: false
        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.student && this.props.student){
            this.setState({
                id: this.props.student.id,
                firstName: this.props.student.firstName,
                lastName: this.props.student.lastName,
                gpa: this.props.student.gpa ? this.props.student.gpa : '',
                schoolId: this.props.student.schoolId
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(event.target.name)
        if((event.target.name === 'firstName' && event.target.value == '')
            || (event.target.name === 'lastName' && event.target.value == '')){
            this.setState({
              fieldError: true
            })
        } else {
            this.setState({
                fieldError: false
              })
        }
        if(event.target.name === 'gpa'
            && (parseFloat(event.target.value) < parseFloat(0) || parseFloat(event.target.value) > parseFloat(4))){
                this.setState({
                    gpaFieldError: true
                })
            } else {
                this.setState({
                    gpaFieldError: false
                })
            }
    }

    handleSelect(event) {
        this.setState({
            schoolId: event.target.value === 'not enrolled' ? null : event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const student = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gpa: this.state.gpa,
            schoolId: this.state.schoolId,
        }
        this.props.student ? this.props.updateStudent(student) : this.props.addStudent(student)
        this.setState({
            id: null,
            firstName: '',
            lastName: '',
            gpa: '',
            schoolId: ''
        })
    }

    render(){
        const { firstName, lastName, gpa, schoolId, fieldError, gpaFieldError }  = this.state
        const { student, schools, setSchool } = this.props;
        const {handleChange, handleSelect, handleSubmit} = this;
        let changed;
        console.log(fieldError)
        if(student){
            changed = student.firstName !== firstName || student.lastName !== lastName || student.gpa !== gpa || student.schoolId !== schoolId
        } else {
            changed = '' !== firstName || '' !== lastName || '' !== gpa
        }
        const invalidForm = fieldError || gpaFieldError || !changed
            || firstName == '' || lastName == '' ;
        return (
            <div className='formContainer'>
            <form onSubmit={handleSubmit}>
            <div className='flex column'>
            {
                student ? <h2>Edit Student</h2> : <h2>Create Student</h2>
            }
                <div>
                    <label htmlFor='firstName'>First Name: 
                    {
                        fieldError? <span className='warning'>Required Field</span> : null
                    }
                    </label>
                    <input 
                        type='text'
                        name='firstName'
                        value={firstName}
                        className='input'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name: 
                    {
                        fieldError ? <span className='warning'>Required Field</span> : null
                    }
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        value={lastName}
                        className='input'
                        onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='gpa'>GPA: 
                    {
                        gpaFieldError ? <span className='warning'>Please enter values between 0 and 4</span> : null
                    }
                    </label>
                    <input
                        type='number'
                        name='gpa'
                        value={gpa}
                        className='input' onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='school'>School: 
                    </label>
                    <select name='school' value={schoolId} onChange={handleSelect}>
                        {
                            setSchool ? <option key={setSchool.id} value={setSchool.id}>{setSchool.name}</option> : <option value=''>not enrolled</option>
                        }
                        {
                            schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
                        }
                    </select>
                </div> 
                <button disabled = {invalidForm} type='submit'>Submit</button>
            </div>
        </form>
        </div>
        )
    }
}

const mapStateToProps = ({schools}, {student, match}) => {
    const setSchoolId = parseInt(match.params.id);
    return {
        setSchool: setSchoolId ? getSchoolById(schools, setSchoolId) : null,
        schools: setSchoolId ? schools.filter(e => e.id !== setSchoolId) : schools,
        student
    }
};

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        updateStudent: (student) => dispatch(updateStudent(student, history)),
        addStudent: (student) => dispatch(addStudent(student, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);