import React, { useContext } from "react";
import { FaNewspaper } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
    const authCntxt = useContext(AuthContext);
    function Logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        authCntxt.setAuth({})
    }

    return (
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-[#e5c2a1] py-3 shadow backdrop-blur-lg md:top-7 md:rounded-3xl lg:max-w-screen-lg">
            <div className="px-4">
                <div className="flex items-center justify-between">
                    <div className="flex shrink-0">
                        <a aria-current="page" className="flex items-center" href="/">
                            <FaNewspaper className="h-7 w-auto text-[#7F3D27]"/>
                            <p className="sr-only">NYT</p>
                        </a>
                    </div>
                    
                    {authCntxt.auth.email? 
                    <div className="flex items-center justify-end gap-3">
                        
                        <FaUserCircle fontSize={"25px"}/>
                        <button
                            className="inline-flex items-center justify-center rounded-xl bg-[brown] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-[#802d2d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            href="/login"
                            onClick={Logout}
                        >
                            Logout
                        </button>
                    </div>
                    :""} 
                </div>
            </div>
        </header>
    );
}
