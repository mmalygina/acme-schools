import React, { Component } from 'react';
import store from './../store';
import {getSchools} from './../reducers/schoolsReducer';
import {getStudents} from './../reducers/studentsReducer';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Schools from './Schools';
import Students from './Students';
import Student from './Student';
import School from './School';
import CreateStudent from './CreateStudent';
import CreateSchool from './CreateSchool';

export default class Main extends Component {
    componentDidMount(){
        store.dispatch(getSchools());
        store.dispatch(getStudents());
    }

    render() {
        const renderNav = ({location}) => {
            return <Nav path = {location.pathname}/>
        } 
        const renderStudent = ({location, match, history}) => {
            return <Student 
                path = {location.pathname}
                match = {match}
                history = {history}
            />
        };
        const renderSchool = ({location, match, history}) => {
            return <School 
                path = {location.pathname}
                match = {match}
                history = {history}
            />
        };
        const renderCreateStudent = ({location, match, history}) => {
            return <CreateStudent 
                path = {location.pathname}
                match = {match}
                history = {history}
            />
        };
        const renderCreateSchool = ({location, match, history}) => {
            return <CreateSchool
                path = {location.pathname}
                match = {match}
                history = {history}
            />
        };
        return (
            <div id = 'main'>
                <h1>ACME Shcools</h1>
                <Router>
                    <div>
                        <Route render={ renderNav } />
                        <Switch>
                            <Route exact path='/schools' component = {Schools} />
                            <Route path='/schools/create' render = {renderCreateSchool} />
                            <Route path='/schools/:id' render = {renderSchool} />
                        </Switch>
                        <Switch>
                            <Route exact path='/students' component = {Students} />
                            <Route exact path='/students/create' render = {renderCreateStudent} />
                            <Route path='/students/create/:id' render = {renderCreateStudent} />
                            <Route path='/students/:id' render = {renderStudent} />
                        </Switch>  
                    </div>
                </Router>
            </div>
        )
    }
}