import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

import { makeStyles } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

export default function Chat({ actions }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    actions.subcribeToMessage((message) =>
      setMessages((messages) => [...messages, message])
    );

    actions.subcribeToJoin((message) =>
      setMessages((messages) => [...messages, message])
    );

    actions.subcribeToLeave((message) =>
      setMessages((messages) => [...messages, message])
    );
  }, [actions]);

  return (
    <div>
      <SendMessageForm sendMessage={actions.sendMessage} />
      <MessageContainer messages={messages} />
    </div>
  );
}

Chat.propTypes = {
  actions: PropTypes.object.isRequired,
};
