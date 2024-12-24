import React from "react";
import { NavermapsProvider } from "react-naver-maps"; 
import Map from "./components/Map"; 

function App() {
  const clientId = import.meta.env.VITE_NAVER_MAP_CLIENT_ID;

  return (
    <NavermapsProvider ncpClientId="1vj33hwfl6">
      <Map /> 
    </NavermapsProvider>
  );
}

export default App;
