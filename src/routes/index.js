import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyNotes, CreateNote, UserProfile, LandingPage, LoginScreen, RegisterScreen } from '../screens/index';
import { Loader } from '../components/index';


const AppRoutes = () => {
    const { token } = useSelector(state => state.authReducer)
    if (!Boolean(token)) {
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                    </Routes>
                </Suspense>
            </>
        )
    } else {
        return (
            <>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<MyNotes />} />
                        <Route path="/create-note" element={<CreateNote />} />
                        <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                </Suspense>
            </>
        )
    }
}
export default AppRoutes;
