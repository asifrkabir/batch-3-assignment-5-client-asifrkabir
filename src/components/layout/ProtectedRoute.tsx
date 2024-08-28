import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  logout,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { TAuthUser } from "../../types";

type ProtectedRouteProps = {
  children: ReactNode;
  role?: string;
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();

  let user;

  if (token) {
    user = verifyToken(token) as TAuthUser;
  }

  if (role && role !== user?.role) {
    //TODO: Route user to ErrorPage instead of logging them out
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
