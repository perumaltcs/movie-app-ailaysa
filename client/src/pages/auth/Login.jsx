import "./auth.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner'
import axios from "axios";

const Login = () => {
    const navigate = useNavigate()

    const [ form, setForm ] = useState({
        email: "",
        password: ""
    })

    const [ loading, setLoading ] = useState(false)

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        
        setForm(previousState => ({
            ...previousState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        toast.dismiss();
        setLoading(true)
 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setLoading(false);
            toast.error("Please enter a valid email address", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        if (form.password.length < 8) {
            setLoading(false);
            toast.error("Password must be at least 8 characters", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        const inputData = {
            email: form.email,
            password: form.password
        }

        try {
            const result = await axios.post(
                `https://movie-app-api-ai4n.onrender.com/api/auth/login`, 
                inputData
            ); 

            if (result && result.data.status === true) {
                if(result.data.token) 
                    localStorage.setItem('auth_token', result.data.token);

                toast.success(result.data.message,
                    {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                )

                setTimeout(() => {
                    setLoading(false)
                    navigate("/movie-dashboard");
                }, 3000);
            } 
            else {
                toast.error(result.data.message,
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                )
                setLoading(false)
            }
        } 
        catch (error) {
            toast.error("An error occurred during login. Please try again",
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                }
            )
            setLoading(false)
        }
    }

    return (
        <>
            {loading && (
                <div className="loading-container">
                    <div className="loading">
                        <RotatingLines
                            visible={true}
                            height="96"
                            width="96"
                            color="#ED7014"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                        />
                    </div>
                </div>
            )}

            <div className='auth-container'>
                <div className="form-section">
                    <ToastContainer/>

                    <div className="form-header-section">
                        <h1>Welcome Back 👋</h1>
                        <p>
                            Today is a new day. It's your day. You shape it. <br />
                            Sign in to start managing your projects.
                        </p>

                        <form 
                            className='form-group'
                            onSubmit={handleFormSubmit}
                            onKeyDown={(e) => {
                                if (loading && e.key === "Enter")
                                    e.preventDefault();
                            }}
                        >
                            <div>
                                <div className="label">Email</div>
                                <input
                                    type='text' 
                                    name='email'
                                    value={form.email}
                                    onChange={handleFormChange}
                                    placeholder='Example@email.com'
                                    required
                                />
                            </div>

                            <div>
                                <div className="label">Password</div>
                                <input
                                    type={"password"}
                                    name='password'
                                    value={form.password}
                                    onChange={handleFormChange}
                                    placeholder='At least 8 characters'
                                    required
                                />
                            </div>

                            <div className="forgot-password">Forgot Password?</div>

                            <button className="form-button" type="submit">Sign in</button>

                            <div className="form-signup-text">
                                Don't you have an account? <span onClick={() => navigate("/register")}>Sign up</span>
                            </div>
                        </form>
                    </div>
                    <div className="form-footer-section">
                        © 2023 ALL RIGHTS RESERVED
                    </div>
                </div>

                <div className="image-section">
                    <div></div>
                </div>
            </div>
        </>
    );
};

export default Login;
