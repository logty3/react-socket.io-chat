import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import { Paper, InputBase, Divider, IconButton } from "@material-ui/core";

import { Directions as DirectionsIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  messageForm: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 200,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SendMessageForm({ sendMessage }) {
  const classes = useStyles();
  const [text, setText] = useState("");

  const addMessage = () => {
    if (text) {
      sendMessage(text);
      setText("");
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const sendEnter = () => {
    if (event.keyCode == 13) {
      event.preventDefault();
      addMessage();
    }
  };

  return (
    <Paper component="form" className={classes.messageForm}>
      <InputBase
        onChange={handleChange}
        value={text}
        onKeyDown={sendEnter}
        className={classes.input}
        placeholder="Message text"
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={addMessage}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

SendMessageForm.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
