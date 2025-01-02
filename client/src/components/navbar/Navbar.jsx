import "./Navbar.css";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login", { replace: false })
  };

  return (
        <nav className="navbar">
            <div className="navbar-left">
                <div>IMDB</div>
            </div>

            <div className="navbar-right">
                <svg
                onClick={() => navigate("/movie-dashboard")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
                stroke-width="2"
                >
                {" "}
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>{" "}
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>{" "}
                <path d="M10 12h4v4h-4z"></path>{" "}
                </svg>
                <svg
                    onClick={() => navigate("/search")} 
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                </svg>
                <svg
                onClick={handleLogout}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                width="24"
                height="24"
                stroke-width="2"
                >
                <path d="M20 12l-10 0"></path>
                <path d="M20 12l-4 4"></path>
                <path d="M20 12l-4 -4"></path>
                <path d="M4 4l0 16"></path>
                </svg>
            </div>
        </nav>
    );
};

export default Navbar;
