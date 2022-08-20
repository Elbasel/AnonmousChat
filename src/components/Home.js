import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useState } from "react";

const Home = () => {
  const [currentView, setCurrentView] = useState("SignIn");

  const handleSignUpClick = () => {
    setCurrentView("SignUp");
  };

  const handleSignInClick = () => {
    setCurrentView("SignIn");
  };

  return (
    <div className="Home">
      {currentView === "SignIn" ? <SignIn /> : null}
      {console.log(currentView)}

      {currentView === "SignIn" ? (
        <button
          className="SignUpLink fixed top-3 right-3 text-colors-white bg-colors-black p-3 rounded-3xl"
          id="sign-up"
          onClick={handleSignUpClick}
        >
          Or Sign Up
        </button>
      ) : null}

      {currentView === "SignUp" ? <SignUp /> : null}

      {currentView === "SignUp" ? (
        <button
          className="SignInLink fixed top-3 right-3 text-colors-white bg-colors-black p-3 rounded-3xl"
          id="sign-in"
          onClick={handleSignInClick}
        >
          Or Sign In
        </button>
      ) : null}
    </div>
  );
};

export default Home;
