import { Link } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { LuPen } from "react-icons/lu";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const auth = useAuth();
  const loggedIn = auth?.isLoggedIn;
  const handleLogout = async () => {
    await auth?.logout();
  };

  return (
    <nav className="flex items-center justify-between h-[80px] w-full px-2 md:px-14">
      <div className="flex gap-1 items-center">
        <Link to="/">
          <h1 className="text-lg lg:text-2xl font-bold uppercase text-blackMain">
            Around
            <span className="p-1 bg-blueMain rounded-md text-white">32</span>
          </h1>
        </Link>
      </div>
      <div className="hidden md:flex lg-gap-2 md:gap-5 xl:gap-10 items-center justify-center">
        <Link className="text-blackSec md:text-lg hover:text-blueMain" to="/">
          Home
        </Link>
        <Link
          className="text-blackSec md:text-lg hover:text-blueMain"
          to="/home"
        >
          Discover
        </Link>
        <Link
          className="text-blackSec md:text-lg hover:text-blueMain"
          to="/home"
        >
          Activities
        </Link>
        <Link
          className="text-blackSec lg:text-lg hover:text-blueMain"
          to="/home"
        >
          About
        </Link>
        <Link className="text-blackSec text-lg hover:text-blueMain" to="/home">
          Contact
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-4">
        {loggedIn ? (
          <>
            <Link
              to="/write"
              className="p-2 border-2 gap-1 flex items-center justify-center lg:px-3 rounded-md border-blueMain text-blueMain"
            >
              Write
              <span>
                <LuPen />
              </span>
            </Link>
            <button
              className="p-2 border-2 lg:px-3 rounded-md border-blueMain bg-blueMain text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="p-2 border-2 gap-1 flex items-center justify-center lg:px-3 rounded-md border-blueMain text-blueMain">
              Write
              <span>
                <LuPen />
              </span>
            </button>
            <Link
              className="p-2 border-2 lg:px-3 rounded-md border-blueMain bg-blueMain text-white"
              to="/signin"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
      <div className="block md:hidden">
        <RiMenu3Line />
      </div>
    </nav>
  );
};

export default Navbar;
