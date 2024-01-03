import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './TaskApp.css';
import ErrorComponent from './ErrorComponent';
import HeaderComponent from './HeaderComponent';
import TaskListComponent from './TaskListComponent';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import WelcomeComponent from './WelcomeComponent';
import AuthProvider, { useAuth } from './security/AuthContext'
import TaskComponent from './TaskComponent';

function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function TaskApp() {
    return (
        <div className="TaskApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />                               
                    
                        <Routes>
                            <Route path='/' element={<LoginComponent />} />
                            <Route path='/login' element={ <LoginComponent /> } />
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
                            <Route path='/tasks/:id' element={
                                <AuthenticatedRoute>
                                    <TaskComponent /> 
                                </AuthenticatedRoute>
                            } />
                            <Route path='/logout' element={
                                <AuthenticatedRoute>
                                    <LogoutComponent /> 
                                </AuthenticatedRoute>
                            }/>
                            <Route path='*' element={<ErrorComponent />} />
                        </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}