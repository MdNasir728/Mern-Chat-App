import { useContext } from "react";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/UserContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout.jsx";
import Signup from "./pages/Signup/Signup.jsx";
const queryClient = new QueryClient();
function App() {
  const { activeUser } = useContext(Context);
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-[url('./assets/home-bg.jpg')]">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" exact element={<Navigate to={"/chats"} />} />
          <Route
            path="/chats"
            element={activeUser ? <Layout /> : <Navigate to={"/login"} />}
          >
            <Route index element={<Home />} />
            <Route path="/chats/:chatId" element={<Home />} />
          </Route>
          <Route
            path="/login"
            element={!activeUser ? <Login /> : <Navigate to={"/chats"} />}
          />
          <Route
            path="/signup"
            element={!activeUser ? <Signup /> : <Navigate to={"/chats"} />}
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
