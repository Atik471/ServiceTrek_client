import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Drawer, IconButton, Tooltip } from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        toast.error("Error signing out:", error.message, {
          position: "top-left",
          autoClose: 2000,
        });
      });
  };

  const GuestMenu = (
    <>
      <NavLink
        to={"/home"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        Home
      </NavLink>
      <NavLink
        to={"/services"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        Services
      </NavLink>
    </>
  );

  const UserMenu = (
    <>
      <NavLink
        to={"/home"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        Home
      </NavLink>
      <NavLink
        to={"/services"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        Services
      </NavLink>
      <NavLink
        to={"/add-service"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        Add Service
      </NavLink>
      <NavLink
        to={"/my-reviews"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        My Reviews
      </NavLink>
      <NavLink
        to={"/my-services"}
        className="block border-b-4 border-transparent hover:border-white pb-2"
      >
        My Services
      </NavLink>
    </>
  );

  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-primary text-white font-bold">
      <h1
        onClick={() => navigate("/home")}
        className="cursor-pointer font-extrabold text-2xl"
      >
        ServiceTrek
      </h1>

      <ul className="hidden md:flex gap-6 items-center">
        {!user ? GuestMenu : UserMenu}
      </ul>

      <div className="hidden md:flex gap-5">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-white px-4 py-2 rounded-lg text-black hover:bg-slate-200"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white px-4 py-2 rounded-lg text-black hover:bg-slate-200"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={() => handleLogout()}
            className="bg-white px-4 py-2 rounded-lg text-black hover:bg-slate-200"
          >
            Logout
          </button>
        )}
        <div>
          {user?.displayName && (
            <Tooltip title={user.displayName} arrow>
              <img
                src={user.imageURL || "./assets/pfp.jpg"}
                alt={user.displayName}
                onError={(e) => {
                  e.target.src = "./assets/pfp.jpg";
                }}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Tooltip>
          )}
        </div>
      </div>

      <div className="md:hidden">
        <IconButton onClick={() => setMobileOpen(!mobileOpen)}>
          <IoMenuSharp size={24} className="text-white" />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <div className="w-64 bg-primary text-white h-full flex flex-col gap-6 p-6 font-bold">
          <div className="flex justify-between items-center">
            <h1
              onClick={() => navigate("/home")}
              className="cursor-pointer font-extrabold text-xl"
            >
              ServiceTrek
            </h1>
            <IconButton onClick={() => setMobileOpen(false)}>
              <IoCloseSharp size={24} className="text-white" />
            </IconButton>
          </div>

          <div>{!user ? GuestMenu : UserMenu}</div>

          <div className="mt-auto">
            {!user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileOpen(false);
                  }}
                  className="bg-white px-4 py-2 w-full rounded-lg text-black hover:bg-slate-200 mb-4"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setMobileOpen(false);
                  }}
                  className="bg-white px-4 py-2 w-full rounded-lg text-black hover:bg-slate-200"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="bg-white px-4 py-2 w-full rounded-lg text-black hover:bg-slate-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
