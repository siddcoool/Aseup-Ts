import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const navigate = useNavigate();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post("/user/register", {
        email,
        password,
      });
      if (status === 201) {
        toast.success(data.message);
        setRegisterSuccess(true);
      } else {
        toast.warn(data.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };
  useEffect(() => {
    if (registerSuccess) {
      navigate("/home");
    }
  }, [registerSuccess, navigate]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Sign Up
        </h1>
        <form className="mt-6">
          {/* Name */}
          <div className="mb-2">
            <label
              htmlFor="Name"
              className="block text-base font-semibold text-gray-800"
            >
              Full Name
            </label>
            <input
              type="text"
              id="Name"
              placeholder="Enter Your Full Name"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* Email */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-base font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={handleEmail}
              placeholder="Enter your Email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          {/* Password */}
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              onChange={handlePassword}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="">
            User already exists?
            <Link to="/login" className="text-sky-500 ml-4">
              Login
            </Link>
          </div>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
