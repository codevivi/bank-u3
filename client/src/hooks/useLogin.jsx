import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../Contexts/GlobalCtx";
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
      .post("http://localhost:5000/login", { loginDetails: loginDetails })
      .then((res) => {
        setLoginResponse(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [loginDetails, addMsg]);

  return [submitLoginDetails, loginResponse];
}

export default useLogin;
