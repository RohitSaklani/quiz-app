import axios from "axios";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import useLoaderContext from "./LoaderContext";
import GlobalLoader from "../components/GlobalLoader";

type AuthContextType = {
  user: string | null;
};

const AuthContext = createContext<AuthContextType>({ user: "" });

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>();
  const { setLoader } = useLoaderContext();
  const navigate = useNavigate();

  const [load, setLoad] = useState(true);

  async function verify() {
    try {
      setLoad(true);
      setLoader({ isLoading: true, opacity: 100 });
      const token = localStorage.getItem("token");

      if (token) {
        const res = await axios.post<any>(
          import.meta.env.VITE_API_URL + "/auth/verify",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Custom-Header": "value",
              token,
            },
          }
        );

        setUser(res.data.user);
      } else {
        console.log(
          "navigation to login !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        );
        navigate("/login");
      }
    } catch (err) {
      console.log("conetxt : ", err);
    } finally {
      //setTimeout(() => setLoader({ isLoading: false }), 2000);
      setLoad(false);
      setLoader({ isLoading: false });
    }
  }

  useEffect(() => {
    console.log("authcontext rendered again");
    verify();
  }, []);

  if (load) {
    return <GlobalLoader opacity={50} />;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
