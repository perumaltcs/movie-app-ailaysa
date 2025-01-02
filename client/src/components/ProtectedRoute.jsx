import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem("auth_token");

    console.log("ProtectedRoute calling", !token);

    if (!token) {
        console.log("Redirecting to login");
        return <Navigate to="/login" />;
    }

    console.log("User authenticated, rendering outlet");
    return <Outlet />;
};

export default ProtectedRoute;
