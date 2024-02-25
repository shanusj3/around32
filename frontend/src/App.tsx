import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />
      </div>
      <div></div>
    </div>
  );
};

export default App;
