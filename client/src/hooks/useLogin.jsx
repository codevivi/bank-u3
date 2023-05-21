import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SERVER_BASE_PATH } from "../utils/config.js";

const URL = SERVER_BASE_PATH + "/login";

function useLogin(addMsg) {
  const [loginRequest, setLoginRequest] = useState(null);
  const [loginResponse, setLoginResponse] = useState(null);

  const setLoginRequestCallback = useCallback((details) => {
    setLoginRequest(details);
  }, []);

  useEffect(() => {
    if (loginRequest === null) {
      return;
    }

    axios
      .post(URL, loginRequest, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoginResponse(res.data);
        }
      })
      .catch((e) => {
        const res = e.response;
        if (!res) {
          addMsg({ type: "error", text: "Klaida komunikuojant su serveriu" });
          return;
        }
        if (res.status === 401) {
          addMsg({ type: "warning", text: res.data.message });
          return;
        }
        if (res.status === 403) {
          console.log("should be 403");
          addMsg({ type: "error", text: "Jau prisijungta." });
          return;
        }
        if (res.status === 500) {
          addMsg({ type: "error", text: "Serverio klaida" });
        }
      });
  }, [loginRequest, addMsg]);

  return [setLoginRequestCallback, loginResponse];
}

export default useLogin;
