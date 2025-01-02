import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem("auth_token");

    if (token)
        return <Navigate to="/movie-dashboard" />;

    return <Outlet />;
};

export default PublicRoute;
