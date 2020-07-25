import React from "react";
import PropTypes from "prop-types";

import { Paper, Card, Typography } from "@material-ui/core";

export default function MessageContainer({ messages }) {
  return (
    <Paper>
      {messages.map((message, i) => {
        return (
          <Card key={i}>
            <Typography>{`${message.text} from ${message.userName}. ${message.date} `}</Typography>{" "}
          </Card>
        );
      })}
    </Paper>
  );
}

MessageContainer.propTypes = {
  messages: PropTypes.array.isRequired,
};
