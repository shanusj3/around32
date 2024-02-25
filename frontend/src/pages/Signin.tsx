import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await auth?.login(email, password);
    console.log(res);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (auth?.user) {
      return navigate("/");
    }
  }, [auth, navigate]);

  return (
    <div className="h-screen w-full p-6 md:p-2 ">
      <div className="mt-20 md:mt-32 w-full flex justify-center flex-col items-center ">
        <h1 className="text-2xl font-bold">Sign In</h1>
        <form
          className="w-full md:max-w-[400px] flex flex-col gap-3 mt-4"
          onSubmit={handleSubmit}
        >
          <label className="text-blackSec">Email address</label>
          <input
            value={email}
            autoFocus
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
            Sign In
          </button>
          <p className="text-blackThi mt-4 text-center">
            Don't have an account?
            <Link to="/register" className="text-blueMain">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
