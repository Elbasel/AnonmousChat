import { useState } from "react";
import PubSub from "pubsub-js";
import Parse from "parse";

import InputGroup from "./InputGroup";
import LoadingScreen from "./LoadingScreen";

const SignIn = () => {
  const [currentView, setCurrentView] = useState("SignInForm");
  const [error, setError] = useState({ isError: false, errorMsg: "no error" });

  const outputError = (errorMsg) => {
    setCurrentView("SignInForm");
    setError({ isError: true, errorMsg: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentView("LoadingScreen");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let validUser = false;
    try {
      if (username.length < 3)
        throw new Error("Username must be more than 3 characters long");
      let user = await Parse.User.logIn(username, password);
      PubSub.publish("user-logged-in", user);
    } catch (error) {
      outputError(error.message);
      console.error("Error while logging in user", error);
    }
  };

  return (
    <div className="SignInForm-or-LoadingScreen-div">
      {currentView === "SignInForm" ? (
        <SignInForm
          handleSubmit={handleSubmit}
          isError={error.isError}
          errorMsg={error.errorMsg}
          inputGroups={[
            <InputGroup name="username" isError={error.isError} key={1} />,
            <InputGroup name="password" isError={error.isError} key={2} />,
          ]}
        />
      ) : (
        <LoadingScreen text="Logging In" />
      )}
    </div>
  );
};

const ErrorDiv = ({ isError, errorMsg }) => {
  if (isError) {
    return (
      <div className="text-red-600 max-h-[16px] my-[-20px]">{errorMsg}</div>
    );
  } else {
    return null;
  }
};

const SignInForm = ({ handleSubmit, isError, errorMsg, inputGroups }) => {
  return (
    <form
      className="SignInForm flex flex-col p-2 text-white justify-center items-center gap-10"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl mt-3 mx-auto">Sign In</h1>
      {inputGroups}
      <ErrorDiv isError={isError} errorMsg={errorMsg} />

      <button className="bg-gray-800 p-9 text-4xl rounded-3xl leading-3">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;
