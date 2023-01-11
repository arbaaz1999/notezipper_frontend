import React from "react";
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

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/my-notes" element={<MyNotes />} />
      <Route path="/create-note" element={<CreateNote />} />
      <Route path="/edit-note/:id" element={<EditNote />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};
export default AppRoutes;
