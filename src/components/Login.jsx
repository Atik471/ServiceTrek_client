import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Button, TextField, Typography, IconButton, CircularProgress } from "@mui/material";
import Lottie from "lottie-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, createWithGoogle, signInWithEmail } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const response = await fetch("/assets/lottie/loginAnimation.json");
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching animation JSON:", error);
      }
    };

    fetchAnimation();
  }, []);

  const handleLoginWithGoogle = () => {
    setLoading(true);
    createWithGoogle()
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/");
        toast.success(`Welcome ${user}`, { position: "top-left", autoClose: 2000 });
      })
      .catch((error) => {
        toast.error(`Login Failed! ${error.message}`, { position: "top-left", autoClose: 2000 });
      })
      .finally(() => setLoading(false));
  };

  const handleLoginWithEmail = (data) => {
    setLoading(true);
    signInWithEmail(data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Login Successful!", { position: "top-left", autoClose: 2000 });
        navigate("/");
      })
      .catch((err) => {
        toast.error(`Login Failed! ${err.message}`, { position: "top-left", autoClose: 2000 });
      })
      .finally(() => setLoading(false));
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-50 md:px-24 px-6">
      <Helmet>
        <title>ServiceTrek | Login</title>
      </Helmet>
      
      <div className="w-full md:w-1/2 p-8 bg-white shadow-lg ">
        <Typography variant="h4" gutterBottom className="text-center text-black pb-4" style={{ fontWeight: 700 }}>
          Login
        </Typography>
        
        <form onSubmit={handleSubmit(handleLoginWithEmail)} className="space-y-4">
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Email"
            {...register("email", { required: "Email is required" })}
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            className="bg-gray-50"
          />

          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            id="password"
            label="Password"
            {...register("password", { required: "Password is required" })}
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            className="bg-gray-50"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="mt-4"
            style = {{backgroundColor: "#03853e", fontWeight: 600, paddingTop: "12px", paddingBottom: "12px"}}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={handleLoginWithGoogle}
            className="mt-2"
            style = {{backgroundColor: "black", color:"white", fontWeight: 600, paddingTop: "12px", paddingBottom: "12px"}}
          >
            Login With Google
          </Button>

          <p className="mt-4 text-center">
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate("/register")}>
              Register
            </span>
          </p>
        </form>
      </div>

      <div className="hidden md:block w-1/2 p-8">
        {animationData && <Lottie animationData={animationData} height={400} width={400} />}
      </div>
    </div>
  );
};

export default Login;
