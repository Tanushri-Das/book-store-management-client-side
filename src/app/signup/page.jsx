"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignUp.css";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const page = () => {
  const { createUser, updateUserProfile } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      // Passwords do not match, set passwordsMatch to false
      setPasswordsMatch(false);
      return;
    }

    // Passwords match, proceed with form submission.
    setPasswordsMatch(true);

    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name)
        .then(() => {
          // console.log("user profile info updated");
          const saveUser = {
            name: data.name,
            email: data.email,
          };
          console.log(saveUser);
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  title: "Good job!",
                  text: "Congratulations! Sign Up Successfully!",
                  icon: "success",
                  timer: 1500, // Close after 1500 milliseconds (1.5 seconds)
                  showConfirmButton: false, // Hide the "OK" button
                });
                router.push("/");
              }
            });
        })
        .catch((error) => console.error(error));
    });
  };
  return (
    <div className="flex justify-center items-center my-12 p-4 contact">
      <div className="w-full flex-shrink-0 sm:max-w-2xl bg-base-100 mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="form p-6 bg-white rounded-xl"
        >
          <h1 className="text-white text-center text-3xl mb-6 font-bold">
            Sign Up
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
            <div>
              <label className="block text-white text-[16px] font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                {...register("name", { required: "Name is required" })}
                className="form-input"
              />
              {errors.name && (
                <span className="text-red-600 mt-1">
                  {errors.name?.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-white text-[16px] font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                {...register("email", {
                  required: "Email Address is required",
                })}
                className="form-input"
              />
              {errors.email && (
                <span className="text-red-600 mt-1">
                  {errors.email?.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
            <div>
              <label className="block text-white text-[16px] font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: 6,
                    maxLength: 10,
                  })}
                  className="form-input w-full"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-600 mt-1">
                  {errors.password?.message}
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-600 mt-1">
                  Password must be at least 6 characters
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="text-red-600 mt-1">
                  Password must not exceed 10 characters
                </span>
              )}
            </div>
            <div>
              <label className="block text-white text-[16px] font-semibold mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  className="form-input w-full"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}

              {!passwordsMatch && (
                <span className="text-red-600 mt-1">
                  Password and Confirm Password do not match
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-center my-5">
            <button className="add-to-cart bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-6 py-3 font-semibold rounded-lg text-[16px] sm:text-lg">
              Create an account
            </button>
          </div>
          <p className="text-center text-white text-lg font-medium">
            Already have an account?
            <Link href="/login" className="create-account ms-1">
              Login
            </Link>
          </p>
          {/* <p className="text-center text-[16px] font-semibold my-5">Or</p>
          <SocialLogin /> */}
        </form>
      </div>
    </div>
  );
};

export default page;
