const isAuthenticated = () => {
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};

const authenticate = (jwt, cb) => {
  localStorage.setItem("jwt", JSON.stringify(jwt));
  cb();
};

export { isAuthenticated, authenticate };
