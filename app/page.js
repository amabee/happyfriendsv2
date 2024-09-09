"use client";
import { useEffect, useState } from "react";
import "../public/css/style.css";
import "../public/fonts/material-icon/css/material-design-iconic-font.min.css";
import { login, signup } from "@/lib/lib";
import { Button } from "./components/buttons";
import ToastNotification, { ToastNotif } from "./components/ToastNotifs";
import { useRouter } from "next/navigation";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSignUpSwitch = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const handleValidation = () => {
    if (
      firstname.length <= 0 ||
      lastname.length <= 0 ||
      username.length <= 0 ||
      email.length <= 0
    ) {
      return "There is a missing field. Please provide all the needed data";
    }

    if (password.length < 8) {
      return "Password should be at least 8 characters";
    }

    if (password !== confirmPassword) {
      return "Password and Confirm Password do not match";
    }

    return null;
  };

  const handleLogin = () => {
    if (username.length <= 0 || password.length <= 0) {
      return ToastNotif("Username or Password is empty!", "error");
    }

    ToastNotif(
      "Welcome Back!",
      "promise",
      async () => {
        const { success, message } = await login(username, password);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!success) {
          console.log(message);
          throw new Error(message);
        }

        window.location.href = "/Home";
        return success;
      },
      (error) => `${error.message}`
    );
  };

  const handleSignUp = () => {
    const validationMessage = handleValidation();
    if (validationMessage) {
      ToastNotif(validationMessage, "error");
      return;
    }

    ToastNotif(
      "Success",
      "promise",
      async () => {
        const { success, message } = await signup(
          username,
          confirmPassword,
          firstname,
          lastname,
          email
        );

        await new Promise((resolve) => setTimeout(resolve, 5000));

        if (!success) {
          throw new Error(message);
        }
        setIsSignUp(false);
        return success;
      },
      (error) => `${error.message}`
    );
  };

  return (
    <div className="main">
      {/* SIGN UP */}
      {isSignUp ? (
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form className="register-form" id="register-form">
                  <div className="form-group">
                    <label for="firstname">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="Firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="lastname">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="username">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="re-pass">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <input
                      type="password"
                      name="re_pass"
                      id="re_pass"
                      placeholder="Repeat your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="button"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Register"
                      onClick={() => handleSignUp()}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src="images/signup-image.jpg" alt="sing up image" />
                </figure>
                <Button
                  href="#"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleSignUpSwitch}
                  variant="default"
                >
                  I am already member
                </Button>
              </div>
            </div>
          </div>
          <ToastNotification />
        </section>
      ) : (
        <section className="sign-in">
          {/* LOGIN */}
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src="/images/signin-image.jpg" alt="sing up image" />
                </figure>
                <Button
                  href="#signup"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={handleSignUpSwitch}
                  variant="gooeyLeft"
                >
                  Create an account
                </Button>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Sign In</h2>
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group">
                    <label for="your_name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="your_name"
                      id="your_name"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="your_pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="your_pass"
                      id="your_pass"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="agree-term"
                    />
                    <label for="remember-me" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      Remember me
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="button"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      value="Log in"
                      onClick={handleLogin}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <ToastNotification />
        </section>
      )}
    </div>
  );
}
