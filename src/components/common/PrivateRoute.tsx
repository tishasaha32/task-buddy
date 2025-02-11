import React from "react";
import { auth } from "@/firebase/config";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
