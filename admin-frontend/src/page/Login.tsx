import { Button, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";
import { LoginErrorType, LoginSchema, LoginType } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLoaderContext from "../context/LoaderContext";
import useAuthContext from "../context/AuthContext";

const Login = () => {
  const [data, setData] = useState<LoginType>({ email: "", password: "" });
  const [errors, setErrors] = useState<LoginErrorType | null>();
  const { setLoader } = useLoaderContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  async function handleLogin(e: any) {
    try {
      setLoader({ isLoading: true });
      e.preventDefault();
      setErrors(null);
      const validation = LoginSchema.safeParse(data);
      if (validation.success) {
        try {
          const response = await axios.post(
            import.meta.env.VITE_API_URL + "/auth/login",
            data
          );

          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.user);
            navigate(0);
          }
        } catch (err: any) {
          toast.error(err.response.data.error);
        }
      } else {
        setErrors(validation.error?.format());
      }
    } catch (e) {
      console.log("error : ", e);
    } finally {
      setLoader({ isLoading: false, opacity: 50 });
    }
  }
  if (user) {
    navigate("/");
  }

  return (
    <Flex minHeight={"80vh"} align={"center"} justify={"center"}>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log in to your account
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
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                value={data?.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
              />
              <Text color="red" size={"2"} className="min-h-[20px] block">
                {errors?.email?._errors[0] ?? " "}
              </Text>
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
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data?.password}
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
              />
              <Text color="red" size={"2"} className="min-h-[20px] block">
                {errors?.password?._errors[0]}
              </Text>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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

            <Button size={"3"} className="w-full" onClick={handleLogin}>
              Log In
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <a
                href="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>{" "}
      </div>
    </Flex>
  );
};

export default Login;
