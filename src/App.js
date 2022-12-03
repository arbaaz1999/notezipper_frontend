import React, { useEffect } from "react";
import { Footer, Header } from "./components";
import AppRoutes from "./routes";
// import { useCheckUserQuery } from "./services/authAPI";


function App() {
  return (
    <div>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App