import MainLayout from "@/components/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useAppDispatch } from "@/store/hooks";
import RequireAuth from "../Auth";
import { AdminRoutes } from "@/config";
import Login from "../Login";
import Register from "../Register";
import { userAction } from "@/store/reducers/userSlice";

export default function Main() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt_decode(token);
      //@ts-ignore
      dispatch(userAction.getUser(decoded?.primarysid))
        .unwrap()
        .then((res) => {})
        .catch((err) => {
          localStorage.removeItem("token");
        });
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        element={
          <RequireAuth>
            <MainLayout />
          </RequireAuth>
        }>
        {AdminRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Route>
    </Routes>
  );
}
