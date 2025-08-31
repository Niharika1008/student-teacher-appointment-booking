// src/Pages/AdminForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../UI/Spinner";


function AdminLogin() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    setSpinner(true);

    setTimeout(() => {
      if (
        formData.email === "admin@gmail.com" &&
        formData.password === "admin123"
      ) {
        localStorage.setItem("Admin Name", "Demo Admin");
        localStorage.setItem("email", formData.email);

        toast.success("Admin logged in successfully!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Invalid credentials. Use admin@gmail.com / admin123");
      }
      setSpinner(false);
    }, 1000);
  }

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <section className="bg-gray-100 dark:bg-slate-900 min-h-screen flex items-center justify-center p-8 w-full">
          <div className="bg-white rounded-lg dark:bg-slate-800 dark:text-white dark:border-gray-200 dark:border shadow-lg p-8 w-full max-w-md">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-2xl">Admin Login</h2>
              <p className="text-sm mt-4 dark:text-gray-300">
                Please login as Admin
              </p>

              <form
                className="flex flex-col gap-3 mt-4 w-full"
                onSubmit={submitHandler}
              >
                <input
                  className="mt-3 p-2 border rounded dark:bg-slate-700"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Email"
                  required
                />
                <label className="text-xs text-gray-500">
                  Email: admin@gmail.com
                </label>

                <input
                  className="mt-3 p-2 border rounded dark:bg-slate-700"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Password"
                  required
                />
                <label className="text-xs text-gray-500">
                  Password: admin123
                </label>

                <div className="flex mt-4 gap-3 w-full">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600 w-full"
                  >
                    Login
                  </button>

                  <Link to="/admin/signup" className="w-full">
                    <button
                      type="button"
                      className="bg-green-500 text-white p-2 rounded cursor-pointer hover:bg-green-600 w-full"
                    >
                      Register
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default AdminLogin;
