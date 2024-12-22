import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, createWithGoogle, createWithEmail } =
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
        toast.success("Login Successful!", {
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

  const handeRegisterWithEmail = async (data) => {
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    // if (!passwordRegex.test(password)) {
    //   toast.error(
    //     "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
    //     {
    //       position: "top-center",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       theme: "colored",
    //     }
    //   );
    //   return;
    // }
    setLoading(true);
    try {
      const userCredential = await createWithEmail(
        data.email,
        data.password,
        data.name,
        data.photoURL
      );
      setUser(userCredential.user);
      toast.success("Registration Successful!", {
        position: "top-left",
        autoClose: 2000,
      });

      navigate("/");
    } catch (err) {
      const errorCode = err.code;
      console.log(err.code);
      let errorMessage;

      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already in use. Please try a different one.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please check your email.";
          break;
        case "auth/weak-password":
          errorMessage =
            "Password is too weak. Please choose a stronger password.";
          break;
        default:
          errorMessage = "An unknown error occurred during sign-up.";
          break;
      }

      setError(errorMessage);
      toast.error(`Sign up Failed! ${errorMessage}`, {
        position: "top-left",
        autoClose: 2000,
      });
      setLoading(false);
    }
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit(handeRegisterWithEmail)}>
        <div>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Name"
            required
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
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
        <div>
          <input
            type="text"
            id="photoURL"
            {...register("photoURL")}
            placeholder="Photo URL"
          />
          {errors.photoURL && (
            <p style={{ color: "red" }}>{errors.photoURL.message}</p>
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

        <button type="submit">Register</button>
      </form>
      <button onClick={() => handleLoginWithGoogle()}>
        Register With Google
      </button>
      <p>
        Already have an account?
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Register;
