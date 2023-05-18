import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SERVER_BASE_PATH } from "../utils/config.js";

const URL = SERVER_BASE_PATH + "/login";

function useLogin(addMsg) {
  const [loginDetails, setLoginDetails] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  const submitLoginDetails = useCallback((details) => {
    setLoginDetails(details);
  }, []);

  useEffect(() => {
    if (loginDetails === null) {
      return;
    }

    axios
      .post(URL, loginDetails, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setLoginResponse(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [loginDetails, addMsg]);

  return [submitLoginDetails, loginResponse];
}

export default useLogin;
