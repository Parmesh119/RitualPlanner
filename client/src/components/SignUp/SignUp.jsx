
import { NavLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast'
import {jwtDecode} from 'jwt-decode'
import axios from "axios";

const LoginForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // checkbox cheched or not checking
  const [ischecked, setIschecked] = useState(false)

  // function for checking
  const check = (e) => {
    setIschecked(e.target.checked)
  }

  // checking password strength
  const [strength, setStrength] = useState("");

  const evaluatePasswordStrength = (password) => {
    if (!password) {
      return setStrength("");
    }

    let strengthLevel = "Weak";
    if (password.length >= 8) {
      strengthLevel = "Medium";
    }
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      strengthLevel = "Strong";
    }

    setStrength(strengthLevel);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
  };

  const popupStyle = {
    position: "absolute",
    top: "40px",
    left: "0",
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
    zIndex: 10,
  };



  function myFunction() {
    var x = document.getElementById("password");
    var y = document.getElementById("confirm_password")
    if (x.type === "password" && y.type === "password") {
      x.type = "text";
      y.type = "text";
    } else {
      x.type = "password";
      y.type = "password";
    }
  }

  const handleSubmit = async () => {

    // client side validation
    if (!name || !email || !password || !number || !username) {
      return toast.error("Provide All The Data..!", { position: "top-center" });
    }

    if (!ischecked) {
      return toast.error("Accept the Terms & Conditions!", { position: "top-center" })
    }


    const response = await fetch(import.meta.env.VITE_BASE_URL + '/api/users/register', {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ username, name, email, number, password })
    })
    const signUpData = await response.json()

    if (signUpData.error) {
      toast.error(signUpData.error)
    } else {
      const loadingToastId = toast.loading('Creating New Account...');
      setName("")
      setUsername("")
      setEmail("")
      setNumber("")
      setPassword("")
      setConfirmPassword("")
      toast.dismiss(loadingToastId)
      toast.success(signUpData.success)
      navigate("/")

      const tokens = signUpData?.token
      localStorage.setItem("token", signUpData?.token)
      localStorage.setItem("userId", signUpData?.user?._id);

      const decoded = jwtDecode(tokens)

      const res = await fetch(import.meta.env.VITE_BASE_URL + "/api/users/verifyuser", {
        method: "POST",
        body: tokens
      })


      localStorage.setItem("userId", decoded.user.id);
      localStorage.setItem("userEmail", decoded.user.email);
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center">
      <Helmet>
        <title>
          Register - RitualPlanner
        </title>
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Sign In Heading */}
        <img
          alt="RitualPlanner"
          src="https://i.ibb.co/wS8fFBn/logo-color.png"
          className="h-12 w-auto m-auto mb-2"
        />
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Register to get started
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Nice to meet you! Enter your details to register
        </p>

        {/* Username input */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Username"
            autoFocus
            required
          />
        </div>

        {/* Name input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="name@mail.com"
            required

          />
        </div>

        {/* Mobile Number input */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Phone Nunber
          </label>
          <input
            type="number"
            id="phone"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0123456789"
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
            {password && (
              <div style={popupStyle}>
                <p>Password Strength: {strength}</p>
                {strength === "Weak" && (
                  <p style={{ color: "red" }}>Consider adding more characters, numbers, or symbols.</p>
                )}
                {strength === "Medium" && (
                  <p style={{ color: "orange" }}>Try adding uppercase letters, numbers, or symbols.</p>
                )}
                {strength === "Strong" && (
                  <p style={{ color: "green" }}>Your password is strong.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* confirm password */}
        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
          <div className="text-left">
            <label><input type="checkbox" onClick={myFunction} className="mt-4 mx-1 p-2 " />Show Password</label>
          </div>
          <div className="text-left">
            <label><input type="checkbox" onChange={check} checked={ischecked} className="mt-4 mx-1 p-2 " />I Accept the <NavLink to="/company/terms-conditions" className="text-blue-900 font-bold underline">Terms & Conditions</NavLink></label>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          Register
        </button>
        <span>OR</span>
        {/* Forgot Password Link
        <div className="flex justify-between items-center mb-4">
          <NavLink
            to="/forgot-password"
            className="text-sm text-blue-800 font-bold hover:underline"
          >
            Forgot password?
          </NavLink>
        </div> */}

        {/* Google Login Button */}
        <button
          type="button"
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 flex justify-center items-center mb-4"
        >
          <img
            src="https://logowik.com/content/uploads/images/985_google_g_icon.jpg"
            alt="Google Logo"
            className="w-45 h-8 mr-2"
          />
          Register With Google
        </button>

        {/* Create Account Link */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-800 font-semibold hover:underline"
            >
              Login to Your Account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
