import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Footer, Header } from "./components";
import { checkAuth } from "./features/auth/authThunk";
import AppRoutes from "./routes";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <div>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App