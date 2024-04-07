import axios, { AxiosError } from "axios";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useIsAuthentication from "../hooks/useIsAuthentication";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthenticate } = useIsAuthentication();

//   const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
//     setEmail(event.target.value);
//   };

//   const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     try {
//       const { data, status } = await axios.post("/user/login", {
//         email,
//         password,
//       });

//       if (status === 200) {
//         toast.success(data.message);
//         setAuthenticate(data.user, data.token);
//       } else {
//         toast.warn("Login Failed");
//       }
//     } catch (unknownError) {
//       const error = unknownError as Error | AxiosError;
//       if (axios.isAxiosError(error) && error.response) {
//         toast.error(error.response.data?.message ?? "Internal server error");
//       } else {
//         toast.error('internal server error');
//       }
//     }
//   };

//   return (
//     <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
//       <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
//         <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
//           Log in
//         </h1>
//         <form className="mt-6">
//           <div className="mb-2">
//             <label
//               htmlFor="email"
//               className="block text-base font-semibold text-gray-800"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Email ID"
//               onChange={handleEmail}
//               className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
//             />
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="password"
//               className="block text-sm font-semibold text-gray-800"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               onChange={handlePassword}
//               id="password"
//               placeholder="Password"
//               className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
//             />
//           </div>
//           <a href="#" className="text-xs text-purple-600 hover:underline">
//             Forget Password?
//           </a>
//           <div className="mt-6">
//             <button
//               onClick={handleSubmit}
//               className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

function Login() {
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
    } catch (unknownError) {
      const error = unknownError as Error | AxiosError;
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data?.message ?? "Internal server error");
      } else {
        toast.error("internal server error");
      }
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl text-meta-12 font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          ASEUP
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center text-meta-5">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleEmail}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handlePassword}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-primary-600 bg-meta-12 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
