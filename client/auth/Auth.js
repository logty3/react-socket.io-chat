import React, { useState } from "react";

import { Redirect, useLocation } from "react-router-dom";

import { InputBase } from "@material-ui/core";

import { signin } from "./../auth/api-auth";

import { isAuthenticated, authenticate } from "./../auth/auth-helper";

export default function Auth() {
  const [userName, setName] = useState("");
  const [redirect, setRedirect] = useState(!!isAuthenticated());

  const location = useLocation();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const setUserName = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      signin({ name: userName }).then((data) => {
        authenticate(data, () => {
          setRedirect(true);
        });
      });
    }
  };

  const { from } = location.state || {
    from: {
      pathname: "/",
    },
  };

  if (redirect) return <Redirect to={from} />;

  return (
    <>
      <InputBase
        value={userName}
        onKeyDown={setUserName}
        onChange={handleChange}
        placeholder="Your name"
      />
    </>
  );
}
