import { Theme } from "@radix-ui/themes";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import useAuthContext, { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { Subject } from "./page/Subject";
import Quizs from "./page/Quizs";
import Quiz from "./page/Quiz";

function App() {
  return (
    <>
      <Theme>
        {/* <GlobalLoader /> */}
        <BrowserRouter>
          <AuthContextProvider>
            <Routes>
              <Route path="/" element={<ProtectedRoute />}>
                <Route path="/subject" element={<Subject />} />
                <Route path="/quizs" element={<Quizs />} />
                <Route path="/quiz/:id" element={<Quiz />} />
              </Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </AuthContextProvider>
        </BrowserRouter>

        <Toaster position="top-center" />
      </Theme>
    </>
  );
}

export default App;

function ProtectedRoute() {
  let user = useAuthContext();
  console.log("user : ", user);

  if (user?.user) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
