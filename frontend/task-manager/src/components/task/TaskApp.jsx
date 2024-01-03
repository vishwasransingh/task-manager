import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './TaskApp.css';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import TaskListComponent from './TaskListComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';

export default function TaskManagerApp() {
    return (
        <BrowserRouter>
            <div className="TodoApp">
                <HeaderComponent />                               
                
                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/logout' element={<LogoutComponent /> } />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/welcome/:username' element={<WelcomeComponent />} />
                        <Route path='/tasks' element={<TaskListComponent /> } />
                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>
                
                <FooterComponent />
            </div>
        </BrowserRouter>
    );
}