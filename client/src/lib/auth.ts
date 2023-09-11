import { Navigate } from "react-router-dom";

export default ({ children }) => {
  // check...
  let checked = false;
  if (checked) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
