"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import Link from "next/link";
import "../signup/SignUp.css";
import { useRouter } from "next/navigation";

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    login(email, password).then((result) => {
      const user = result.user;
      console.log(user);

      Swal.fire({
        title: "Good job!",
        text: "You Login Successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      router.push("/");
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center my-16">
      <div className="w-full flex-shrink-0 sm:max-w-lg bg-white mx-auto">
        <form onSubmit={handleLogin} className="form p-6 bg-white rounded-xl">
          <h1 className="text-black text-center text-3xl mb-6 font-bold">
            Login
          </h1>
          <div className="mb-3">
            <label className="block text-black text-[16px] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <label className="block text-black text-[16px] font-semibold">
                Password
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="form-input w-full"
              />

              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button className="add-to-cart bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 font-semibold rounded-lg text-[16px] sm:text-lg">
              Login
            </button>
          </div>
          <p className="text-center login-account text-lg font-medium mt-4">
            Don’t have an account ?
            <Link href="/signup" className="create-account ms-1">
              Create an account
            </Link>
          </p>
          {/* <p className="text-center text-[16px] font-semibold my-5">Or</p>
          <SocialLogin /> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
