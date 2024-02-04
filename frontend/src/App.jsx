import { useContext } from "react";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout.jsx";
const queryClient = new QueryClient();
function App() {
  const { activeUser } = useContext(Context);
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[url('./assets/home-bg.jpg')]">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={activeUser ? <Layout /> : <Navigate to={"/login"} />}
          >
            <Route index element={<Home />} />
            <Route path='/:chatId' element={<Home />} />
          </Route>
          <Route
            path="/login"
            element={!activeUser ? <Login /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signup"
            element={!activeUser ? <Signup /> : <Navigate to={"/"} />}
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
