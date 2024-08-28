import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/shared/Header";
import Home from "./pages/Home";
import Login from './components/Auth/Login';
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  const authCntxt = useContext(AuthContext);
  return (
    <div className="flex-grow p-8 ">
      <Header />
      <div className="">
      {
      authCntxt.auth.email?<Outlet/> :<Login/>
      }
      </div>
    </div>
  );
}
function AppWithcontext(){
  return(
  <AuthProvider>
    <App />
  </AuthProvider>
  );
}
export default AppWithcontext;