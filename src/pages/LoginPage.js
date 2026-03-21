import React, { useState } from "react";

const LoginPage = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const payload = isRegister
        ? form
        : {
            email: form.email,
            password: form.password
          };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      if (isRegister) {
        alert("Registered successfully! Now log in.");
        setIsRegister(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422A12.083 12.083 0 0118 16.5c0 1.105-2.686 2-6 2s-6-.895-6-2c0-1.61-.056-3.156-.16-4.922L12 14z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-blue-700">GradPath</h1>
          <div className="h-1 w-24 mx-auto bg-blue-600 rounded-full mt-3 mb-4"></div>
          <p className="text-gray-600">
            Academic planning and advisor-guided course scheduling
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>

          <div className="px-8 py-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {isRegister ? "Create Account" : "Login"}
            </h2>

            <div className="space-y-4">
              {isRegister && (
                <input
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              )}

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

              {isRegister && (
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="advisor">Advisor</option>
                </select>
              )}

              <button
                onClick={handleSubmit}
                className="w-full py-3 px-4 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </div>

            <p
              className="text-sm text-center mt-5 cursor-pointer text-blue-600 hover:text-blue-700"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister
                ? "Already have an account? Login"
                : "No account? Register"}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          © 2025 GradPath
        </div>
      </div>
    </div>
  );
};

export default LoginPage;