import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import CounterContextProvider from "./Context/CounterContext";
import UserContextProvider from "./Context/UserContext";
import PostContextProvider from "./Context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/production";
import SinglePost from "./Components/SinglePost/SinglePost";

let query = new QueryClient();

const x = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "singlepost/:id",
        element: <SinglePost />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <PostContextProvider>
          <CounterContextProvider>
            <QueryClientProvider client={query}>
              <RouterProvider router={x}></RouterProvider>
              <ReactQueryDevtools />
            </QueryClientProvider>
          </CounterContextProvider>
        </PostContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
