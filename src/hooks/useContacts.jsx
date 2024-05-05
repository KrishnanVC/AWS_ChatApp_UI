import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function useContacts(userName, authToken) {
  let [contacts, setContacts] = useState([]);
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    process.env.SERVER_URL,
    {
      onOpen: (e) => console.log(e),
      onClose: (e) => console.log(e),
      onMessage: (e) => console.log(e),
      share: true,
      queryParams: { name: userName === null ? "" : userName },
      protocols: ["authorization", authToken],
      shouldReconnect: (closeEvent) => true,
      reconnectAttempts: 2,
      reconnectInterval: 3000,
      filter: (message) => JSON.parse(message.data).action === "users",
    }
  );

  useEffect(() => {
    function receiveUserList() {
      if (lastJsonMessage !== null) {
        let contactResponse = lastJsonMessage.contacts;
        console.log("CONTACTS" + contactResponse);
        contactResponse = contactResponse.filter(
          (contact) => contact.name !== userName
        );
        setContacts(contactResponse);
      }
    }

    receiveUserList();
  }, [lastJsonMessage, userName]);

  useEffect(() => {
    function requestUsersList() {
      sendJsonMessage({
        action: "users",
      });
    }

    requestUsersList();
    let delayInSeconds = 10;
    let interval = setInterval(requestUsersList, delayInSeconds * 1000);

    return () => clearInterval(interval);
  }, []);

  return contacts;
}
