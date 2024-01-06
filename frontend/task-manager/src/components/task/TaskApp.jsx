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

/**
 * AuthenticatedRoute - Custom route component to protect routes that require authentication.
 * Redirects to the login page if the user is not authenticated.
 * @param {Object} children - The child components or elements to render if authenticated.
 */
function AuthenticatedRoute({children}) {
    const authContext = useAuth()

    // If the user is authenticated, render the child components
    if(authContext.isAuthenticated)
        return children

    // If not authenticated, redirect to the login page
    return <Navigate to="/" />
}

/**
 * TaskApp - Main application component.
 * Manages routing and includes authentication.
 */
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