import { useState } from "react";
import PubSub from "pubsub-js";
import Parse from "parse";

import InputGroup from "./InputGroup";
import LoadingScreen from "./LoadingScreen";
import PicturePicker from "./PicturePicker";

const SignUp = () => {
  const [currentView, setCurrentView] = useState("SignUpForm");
  const [error, setError] = useState({ isError: false, errorMsg: "no error" });

  const outputError = (errorMsg) => {
    setCurrentView("SignUpForm");
    setError({ isError: true, errorMsg: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCurrentView("LoadingScreen");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const profileImgUrl = document.querySelector(".selected").src;

    try {
      // console.log(
      //   document
      //     .querySelector(".ProfilePicker")
      //     .querySelector(".Images")
      //     .querySelectorAll("img")
      // );
      if (username.length < 3)
        throw new Error("Username must be more than 3 characters long");
      if (password.length < 6)
        throw new Error("Password must be more than 6 characters long");
      if (!document.querySelector(".selected").src) {
        throw new Error("Please choose a profile img");
      }
      const user = new Parse.User();
      user.set("username", username);
      user.set("password", password);
      user.set("profileImgUrl", profileImgUrl);
      const newUser = await user.signUp();
      PubSub.publish("new-user-created", newUser);
    } catch (error) {
      debugger;

      outputError(error.message);
      console.error("Error while signing up user", { error });
    }
  };

  return (
    <div className="SignUpForm-or-LoadingScreen-div">
      {currentView === "SignUpForm" ? (
        <SignUpForm
          handleSubmit={handleSubmit}
          isError={error.isError}
          errorMsg={error.errorMsg}
          inputGroups={[
            <InputGroup name="username" isError={error.isError} key={1} />,
            <InputGroup name="password" isError={error.isError} key={2} />,
          ]}
        />
      ) : (
        <LoadingScreen text="Signing Up" />
      )}
    </div>
  );
};

const ErrorDiv = ({ isError, errorMsg }) => {
  if (isError) {
    return (
      <div className="text-colors-red-600 max-h-[16px] my-3 ">{errorMsg}</div>
    );
  } else {
    return null;
  }
};

const SignUpForm = ({ handleSubmit, isError, errorMsg, inputGroups }) => {
  return (
    <form
      className="SignUpForm flex flex-col p-2 text-colors-white justify-center items-center gap-10 sm:gap-2"
      onSubmit={handleSubmit}
    >
      <h1 className="SignUpHeader text-3xl mt-3 mx-auto">Sign Up!</h1>
      {inputGroups}
      <PicturePicker />
      <ErrorDiv isError={isError} errorMsg={errorMsg} />

      <button className="UserSignUp bg-colors-rose-700 p-9 text-4xl rounded-3xl leading-3">
        Sign Up Now!
      </button>
    </form>
  );
};

export default SignUp;
