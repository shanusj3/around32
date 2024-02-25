import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="h-screen w-full p-6 md:p-2">
      <div className="mt-20 md:mt-32 w-full flex justify-center flex-col items-center ">
        <h1 className="text-2xl font-bold">Register</h1>
        <form className="w-full md:max-w-[400px] flex flex-col gap-3 mt-4">
          <label className="text-blackSec">Name</label>
          <input
            value={name}
            autoFocus
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-8 md:h-10 bg-[#F2F2F2] outline-none pl-3 rounded-md"
          />
          <label className="text-blackSec">Email address</label>
          <input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-8 md:h-10 bg-[#F2F2F2] outline-none pl-3 rounded-md"
          />
          <label className="text-blackSec">Password</label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-8 md:h-10 bg-[#F2F2F2] outline-none pl-3 rounded-md"
          />
          <button
            type="submit"
            className="w-full h-8 md:h-10 bg-blueMain mt-3 rounded-md text-white"
          >
            Create Account
          </button>
          <p className="text-blackThi mt-4 text-center">
            Already have an account?{" "}
            <Link to="/signin" className="text-blueMain">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
