import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, createWithGoogle, signInWithEmail } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const handleLoginWithGoogle = () => {
    createWithGoogle()
      .then((userCredential) => {
        setUser(userCredential.user);
        navigate("/");
        console.log(userCredential);
        toast.success(`Welcome ${user}`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`Login Failed! ${errorMessage}`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLoginWithEmail = (data) => {
    setLoading(true);
    signInWithEmail(data.email, data.password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Login Successful!", {
          position: "top-left",
          autoClose: 2000,
        });
        navigate("/");
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (
          errorCode === "auth/invalid-credential" ||
          errorCode === "auth/user-not-found"
        ) {
          setError("email", { message: "Invalid email or password." });
        } else if (errorCode === "auth/wrong-password") {
          setError("password", { message: "Incorrect password." });
        } else {
          setError("general", { message: "An unknown error occurred." });
        }
        toast.error(`Login Failed! ${errorMessage}`, {
          position: "top-left",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <div className="w-28 h-28 border-8 border-primary border-solid rounded-full animate-spin border-t-transparent"></div>
          <p className="absolute inset-0 flex items-center justify-center text-primary font-semibold text-xl">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>ServiceTrek | Login</title>
      </Helmet>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(handleLoginWithEmail)}>
        <div>
          {/* <label htmlFor="email">Email:</label> */}
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            required
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          {/* <label htmlFor="password">Password:</label> */}
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Password"
            required
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
      <button onClick={() => handleLoginWithGoogle()}>Login With Google</button>
      <p>
        Don&apos;t have an account?{" "}
        <span onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
