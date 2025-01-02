import { HashRouter, BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword"
import MovieDashboard from "./pages/MovieDashboard"
import MovieDetails from "./pages/MovieDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"
import Layout from "./components/layout/Layout"
import SearchPage from "./pages/SearchPage"

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route element={<PublicRoute/>}>
                    <Route path="/" element={<Navigate to="/login" />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/forgot-password" element={<ForgotPassword/>}/>
                </Route>

                <Route element={<ProtectedRoute/>}>
                    <Route element={<Layout/>}>
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/movie-dashboard" element={<MovieDashboard/>}/>
                        <Route path="/movie-details/:id" element={<MovieDetails/>}/>
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default App