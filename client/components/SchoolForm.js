import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateSchool, addSchool} from './../reducers/schoolsReducer';

class SchoolForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.school ? this.props.school.id : null,
            name: this.props.school ? this.props.school.name : '',
            address: this.props.school ? this.props.school.address : '',
            description: this.props.school ? this.props.school.description : '',
            fieldError: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps){
        if(!prevProps.school && this.props.school){
            this.setState({
                id: this.props.school.id,
                name: this.props.school.name,
                address: this.props.school.address,
                description: this.props.school.description,
                fieldError: false
            })
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if(event.target.value === ''){
            this.setState({
              fieldError: true
            })
        } else {
            this.setState({
                fieldError: false
              })
        }
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.school ? this.props.updateSchool(this.state) : this.props.addSchool(this.state)
        this.setState({
            id: null,
            name: '',
            address: '',
            description: ''
        })
    }

    render(){
        const { name, address, description, fieldError }  = this.state
        const { school } = this.props;
        const {handleChange, handleSubmit} = this;
        let changed;
        if(school){
            changed = school.name !== name || school.description !== description || school.address !== address
        } else {
            changed = '' !== name || '' !== description || '' !== address
        }
        const invalidForm = fieldError || !changed;
        return (
            <div>
            <form onSubmit={handleSubmit}>
            <div>
            {
                school ? <h2>Edit School</h2> : <h2>Create School</h2>
            }
                <div>
                    <label htmlFor='name'>School Name: 
                    {
                        fieldError? <span className='warning'>Required Field</span> : null
                    }
                    </label>
                    <input 
                        type='text'
                        name='name'
                        value={name}
                        className='input'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description: 
                    {
                        fieldError? <span className='warning'>Required Field</span> : null
                    }
                    </label>
                    <input
                        type='text'
                        name='description'
                        value={description}
                        className='input'
                        onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor='address'>Address: 
                    {
                        fieldError? <span className='warning'>Required Field</span> : null
                    }
                    </label>
                    <input
                        type='text'
                        name='address'
                        value={address}
                        className='input' onChange={handleChange}/>
                </div>
                <div>
                <button disabled = {invalidForm} type='submit'>Submit</button>
                </div>
            </div>
        </form>
        </div>
        )
    }
}

const mapStateToProps = (state, {school}) => {
    return {
        students: state.students,
        school
    }
};

const mapDispatchToProps = (dispatch, {history}) => {
    return {
        updateSchool: (school) => dispatch(updateSchool(school, history)),
        addSchool: (school) => dispatch(addSchool(school, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolForm);