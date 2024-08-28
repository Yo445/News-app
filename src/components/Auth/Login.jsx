import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const authCntxt = useContext(AuthContext);
  const navigate = useNavigate(); // useNavigate hook

  function loginfun(e) {
    e.preventDefault();
    console.log(email, password);
    // send api request to validate data and get token 
    if (password === '123') {
      const token = 'abc';
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      authCntxt.setAuth({ email, token });
      navigate('home'); // Navigate to the home page after successful login
    } else {
      alert('Not an authorized user');
    }
  }

  return (
    <>
      <div className="relative mx-auto w-full max-w-md bg-[#e5c2a1] px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 mt-[150px]">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#7F3D27]">Sign in</h1>
            <p className="mt-2 text-[#A15A3E]">
              Sign in below to access your account
            </p>
          </div>
          <div className="mt-5">
            <form onSubmit={loginfun}>
              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email Address"
                  className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Password"
                  className="w-full py-px pl-0 bg-transparent outline-none focus:ring-0 border-0 border-b-2 border-[#7F3D27] placeholder:text-[#A15A3E] focus:outline-none text-[#7F3D27] placeholder:text-xs"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="my-6 flex justify-center">
                <button type="submit" className="px-10 focus:outline-none focus:scale-110 font-semibold py-2 rounded-[5px] hover:scale-110 transition-all hover:transition text-[#D9D9D9] bg-[#7F3D27] shadow-[#7F3D27] shadow-lg">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
