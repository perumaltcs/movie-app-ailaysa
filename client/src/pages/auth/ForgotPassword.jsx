import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner'

const Register = () => {
    const navigate = useNavigate()

    const [ form, setForm ] = useState({
        email: "",
        password: "",
        newPassword: ""
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

        if (form.newPassword.length < 8) {
            setLoading(false);
            toast.error("New Password must be at least 8 characters", {
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
            name: form.email,
            email: form.password,
            password: form.newPassword
        }

        try {
            // const result = await axios.post(
            //     `https://movie-app-api-ai4n.onrender.com/api/auth/login`, 
            //     inputData
            // ); 
            
            if (result && result.data.status === true) {
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
                    navigate("/login");
                }, 3000);
            } 
            else {
                setLoading(false)
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
            }
        } 
        catch (error) {
            setLoading(false)
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
                        <h1>Forgot Password</h1>

                        <form 
                            onSubmit={handleFormSubmit}
                            className='form-group'
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

                            <div>
                                <div className="label">New Password</div>
                                <input
                                    type={"password"}
                                    name='newPassword'
                                    value={form.newPassword}
                                    onChange={handleFormChange}
                                    placeholder='At least 8 characters'
                                    required
                                />
                            </div>

                            <button className="form-button" type="submit">Reset Password</button>
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

export default Register;
