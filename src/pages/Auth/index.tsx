import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/selectors";
import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth: React.FC = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
