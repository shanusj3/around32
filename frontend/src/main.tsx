import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import Signin from "./pages/Signin.tsx";
import Register from "./pages/Register.tsx";
import { AuthProvider } from "./context/authContext.tsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import BlogPage from "./pages/BlogPage.tsx";
axios.defaults.baseURL = "http://localhost:4050/api/v1";
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/register" element={<Register />} />
      <Route path="/blog/:blogId" element={<BlogPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
