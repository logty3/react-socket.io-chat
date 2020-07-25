import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
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

export default function Chat({ actions }) {
  const classes = useStyles();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    actions.subcribeToMessage((message) =>
      setMessages((messages) => [...messages, message])
    );
  }, []);

  return (
    <Paper component="div" сlassName={classes.root}>
      <MessageContainer messages={messages} />
      <SendMessageForm sendMessage={actions.sendMessage} />
    </Paper>
  );
}

Chat.propTypes = {
  actions: PropTypes.object.isRequired,
};
