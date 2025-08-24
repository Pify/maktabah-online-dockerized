import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./AuthStore";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = useAuthStore.getState().token;

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children;
};

export default ProtectedRoute;