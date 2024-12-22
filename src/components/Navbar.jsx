import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setUser, logout } = useContext(AuthContext);

  const GuestMenu = (
    <>
      <Link to={"/home"}>Home</Link>
      <Link to={"/services"}>Services</Link>
    </>
  );
  const UserMenu = (
    <>
      <Link to={"/home"}>Home</Link>
      <Link to={"/services"}>Services</Link>
      <Link to={"/add-service"}>Add Service</Link>
      <Link to={"/my-reviews"}>My Reviews</Link>
    </>
  );

  const handleLogout = () => {
    logout()
      .then(() => {
        setUser(null);
        toast.success("Logout Successful!", {
                position: "top-left",
                autoClose: 2000,
              });
      })
      .catch((error) => {
        toast.error("Error signing out:", error, {
                position: "top-left",
                autoClose: 2000,
              });
      });
  };

  

  return (
    <nav className="flex justify-between">
      <h1 onClick={() => navigate("/home")} className="cursor-pointer">ServiceTrek</h1>
      <ul className="flex">
        {!user ? GuestMenu : UserMenu}
      </ul>
      <div className="flex gap-5">
        <div>
          {!user ? <><button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button></> :
          <button onClick={() => handleLogout()}>Logout</button>}
          
        </div>
        <div>
          <p>{user?.displayName || ""}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
