import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  MyNotes,
  CreateNote,
  UserProfile,
  LandingPage,
  LoginScreen,
  RegisterScreen,
  EditNote,
} from "../screens/index";
import { Loader } from "../components/index";

const AppRoutes = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginScreen />} />
            <Route exact path="/register" element={<RegisterScreen />} />
          </Routes>
        </Suspense>
      </>
    );
  } else {
    return (
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route exact path="/" element={<MyNotes />} />
            <Route exact path="/create-note" element={<CreateNote />} />
            <Route exact path="/edit-note/:id" element={<EditNote />} />
            <Route exact path="/profile/" element={<UserProfile />} />
          </Routes>
        </Suspense>
      </>
    );
  }
};
export default AppRoutes;
