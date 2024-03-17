import { MainContainer, Sidebar, Search } from "@chatscope/chat-ui-kit-react";
// import { WebSocketDemo } from "./WebSocket";
import Conversations from "./components/Conversations";
import Chats from "./components/chat/Chats";
import { useEffect, useState } from "react";

// TODO: Need to have a basic chat history for simultaneous chats, authentication
// TODO: UI improvements (message indication, Last message display)

function App() {
  let [userName, setUserName] = useState("");
  let [contactName, setContactName] = useState("Sundar");
  let [conversations, setConversations] = useState([
    {
      name: "Sundar",
      status: "available",
      active: true,
    },
    {
      name: "Gokul",
      status: "available",
      active: false,
    },
    {
      name: "Krish",
      status: "available",
      active: false,
    },
  ]);

  useEffect(() => {
    if (userName === "") {
      let name = prompt("Enter the user name");
      setUserName(name);
    }
  }, [userName]);

  let handleClick = (e) => {
    if (e.target.innerText === "") {
      console.log("Image clicked");
      return "";
    }

    setContactName(e.target.innerText);

    setConversations((converations) => {
      let newConversations = converations.map((conversation) => {
        if (conversation.name === e.target.innerText) {
          return {
            ...conversation,
            active: true,
          };
        }
        return {
          ...conversation,
          active: false,
        };
      });
      return newConversations;
    });
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* <WebSocketDemo /> */}
      <MainContainer responsive>
        <Sidebar position="left">
          <Search placeholder="Search..." />
          <Conversations
            conversations={conversations}
            handleClick={handleClick}
          />
        </Sidebar>
        <Chats userName={userName} contactName={contactName} />
      </MainContainer>
    </div>
  );
}

export default App;
