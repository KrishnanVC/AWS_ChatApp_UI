import { fetchUserAttributes } from "aws-amplify/auth";
import { useState, useEffect } from "react";

export default function useUserName() {
  let [userName, setUserName] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      let userInfo = await fetchUserAttributes();
      console.log(userInfo);
      let userName = userInfo.name;

      setUserName(userName);
    }
    getUserInfo();
  }, []);

  return userName;
}
