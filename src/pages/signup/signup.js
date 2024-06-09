import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEyeSlash, FaEye } from "react-icons/fa";

import bg1 from '../../assets/images/hero/bg3.jpg'
import logo from '../../assets/images/logo-dark.png'
import api from "../../api/http";
import '../../assets/css/eyes.css'
export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    //hien password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const registerMutation = useMutation({
        mutationFn: (formData) => {
            return api.post("signup", formData);
        },
    });
    // doc phan event nhap vao
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            user_name: formData.get('user_name'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        onfinish(data);
    };

    const onfinish = (body) => {
        registerMutation.mutate(body, {
            onSuccess(data) {
                navigate('/login');
                toast.success("Register successfully. Please check your email to verify your account.");
            },
            onError(error) {
                toast.error(error.response?.data?.message || "Registration failed");
            },
        });
    };


    return (
        <section className="bg-home d-flex align-items-center" style={{ backgroundImage: `url(${bg1})`, backgroundPosition: 'center' }}>
            <div className="bg-overlay bg-linear-gradient-2"></div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-5 col-12">
                        <div className="p-4 bg-white rounded shadow-md mx-auto w-100" style={{ maxWidth: '400px' }}>
                            <form onSubmit={handleSubmit}>
                                <Link to="/"><img src={logo} className="mb-4 d-block mx-auto" alt="" /></Link>
                                <h6 className="mb-3 text-uppercase fw-semibold">Register your account</h6>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Name</label>
                                    <input name="user_name" id="name" type="text" className="form-control" placeholder="Your Name" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Your Email</label>
                                    <input name="email" id="email" type="email" className="form-control" placeholder="example@gmail.com" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold" htmlFor="loginpass">Password</label>
                                    <div className="input-group">
                                        <input name='password' type={showPassword ? 'text' : 'password'} className="form-control" id="loginpass" placeholder="Password" />
                                        <span className="input-group-append" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-label form-check-label text-muted" htmlFor="flexCheckDefault">I Accept <Link to="#" className="text-primary">Terms And Condition</Link></label>
                                </div>

                                <button className="btn btn-primary w-100" type="submit">Register as Job candidate</button>

                                <div className="col-12 text-center mt-3">
                                    <span><span className="text-muted small me-2">Already have an account ? </span> <Link to="/login" className="text-dark fw-semibold small">Sign in</Link></span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}