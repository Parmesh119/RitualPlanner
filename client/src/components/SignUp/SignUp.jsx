
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";

const LoginForm = () => {

  function myFunction() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Name"
            autoFocus
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
        </div>

        {/* confirm password */}
        <div className="mb-4">
          <label
            htmlFor="confirm_password"
            className="block text-sm font-semibold text-gray-700 mb-1 text-left"
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="confirm_password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              required
            />
          </div>
          <div className="text-left">
            <input type="checkbox" onClick={myFunction} className="mt-4 mx-1 p-2 " />Show Password
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
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
