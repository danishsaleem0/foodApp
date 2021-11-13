import React from "react";
import Routes from "./config/routes";
import ContextProvider
 from "./context/context";
function App() {
  return (
    <ContextProvider>
    <Routes />
    </ContextProvider>
  );
}

export default App;
