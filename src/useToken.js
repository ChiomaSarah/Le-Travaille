import { useState } from "react";

function useToken() {
  // retrieve token for rendering the correct pages
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    // return the token, if userToken is found
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  // save token to sessionStorage
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
export default useToken;
