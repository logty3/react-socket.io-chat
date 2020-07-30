import React from "react";
import PropTypes from "prop-types";

import { Paper, Card, Typography } from "@material-ui/core";

export default function MessageContainer({ messages }) {
  return (
    <div>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            {message.type == "message" && (
              <Typography>{`${message.text} from ${message.user.name}. ${message.date} `}</Typography>
            )}
            {message.type == "join" && (
              <Typography>{`${message.user.name} join to room. ${message.date} `}</Typography>
            )}
            {message.type == "leave" && (
              <Typography>{`${message.user.name} leave room. ${message.date} `}</Typography>
            )}
          </div>
        );
      })}
    </div>
  );
}

MessageContainer.propTypes = {
  messages: PropTypes.array.isRequired,
};
