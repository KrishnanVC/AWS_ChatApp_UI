import { fetchAuthSession } from "aws-amplify/auth";
import { useState, useEffect } from "react";

export default function useAuthToken() {
  let [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    async function currentSession() {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        console.log("AUTH" + accessToken);
        setAuthToken(accessToken.toString());
      } catch (err) {
        console.log(err);
      }
    }
    currentSession();
  }, []);

  return authToken;
}
