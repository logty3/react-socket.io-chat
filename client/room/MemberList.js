import React from "react";
import PropTypes from "prop-types";

import { List, ListItem, ListItemText } from "@material-ui/core";

const MemberList = ({ users }) => {
  return (
    <List>
      {users.map((user, i) => (
        <ListItem key={i}>
          <ListItemText primary={user.name} />
        </ListItem>
      ))}
    </List>
  );
};

MemberList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default MemberList;
