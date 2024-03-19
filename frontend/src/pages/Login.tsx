import axios, { AxiosError } from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useIsAuthentication from "../hooks/useIsAuthentication";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthenticate } = useIsAuthentication();

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post("/user/login", {
        email,
        password,
      });

      if (status === 200) {
        toast.success(data.message);
        setAuthenticate(data.user, data.token);
      } else {
        toast.warn("Login Failed");
      }
      console.log({ data, status });
    } catch (unknownError) {
      const error = unknownError as Error | AxiosError;
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message ?? "Internal server error");
      }
      else{
        toast.error('internal server error')
      }
    }
    console.log(email, password);
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Log in
        </h1>
        <form className="mt-6">
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
              placeholder="Email ID"
              onChange={handleEmail}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              onChange={handlePassword}
              id="password"
              placeholder="Password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-purple-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>

       
      </div>
    </div>
  );
};
export default Login;
