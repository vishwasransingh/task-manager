import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './TaskApp.css';
import ErrorComponent from './ErrorComponent';
import FooterComponent from './FooterComponent';
import HeaderComponent from './HeaderComponent';
import TaskListComponent from './TaskListComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext'

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TaskManagerApp() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="TodoApp">
                    <HeaderComponent />                               
                    
                        <Routes>
                            <Route path='/' element={<LoginComponent />} />
                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent /> 
                                </AuthenticatedRoute>
                            }/>
                            <Route path='/login' element={<LoginComponent />} />
                            <Route path='/welcome/:username' element={
                                <AuthenticatedRoute>
                                    <WelcomeComponent />
                                </AuthenticatedRoute> 
                            }/>
                            <Route path='/tasks' element={
                                <AuthenticatedRoute>
                                    <TaskListComponent/> 
                                </AuthenticatedRoute>
                            }/>
                            <Route path='*' element={<ErrorComponent />} />
                        </Routes>
                    
                    <FooterComponent />
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}