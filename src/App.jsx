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
      self: false,
    },
    {
      name: "Gokul",
      status: "available",
      active: false,
      self: false,
    },
    {
      name: "Krish",
      status: "available",
      active: false,
      self: false,
    },
  ]);

  let handleUserName = (name) => {
    setUserName(name);
    setConversations((conversations) => {
      let userConversationWithYou = conversations.filter(
        (conversation) => conversation["self"] === true
      );

      if (userConversationWithYou.length > 0) {
        return conversations;
      }

      let userConversation = conversations.filter(
        (conversation) => conversation["name"] === name
      )[0];
      userConversation["self"] = true;

      let otherConversations = conversations.filter(
        (conversation) => conversation["name"] !== name
      );

      let newConversations = [userConversation, ...otherConversations];
      return newConversations;
    });
  };

  useEffect(() => {
    if (userName === "") {
      let name = prompt("Enter the user name");
      handleUserName(name);
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
