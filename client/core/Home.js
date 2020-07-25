import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { Paper, InputBase } from "@material-ui/core";

export default function Home() {
  const [userName, setName] = useState("");

  const history = useHistory();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const setUserName = (event) => {
    if (event.keyCode == 13 && event.target.value) {
      event.preventDefault();
      history.push("rooms", { userName });
    }
  };

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
