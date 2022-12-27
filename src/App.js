import React from "react";
import { Footer, Header } from "./components";
import AppRoutes from "./routes";

function App() {
  return (
    <div>
      <Header />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;
