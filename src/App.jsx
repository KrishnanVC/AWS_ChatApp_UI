import { MainContainer, Sidebar, Search } from "@chatscope/chat-ui-kit-react";
import Conversations from "./components/Conversations";
import Chats from "./components/chat/Chats";
import { useEffect, useState } from "react";
import { fetchUserAttributes, fetchAuthSession } from "aws-amplify/auth";

import UserContext from "./Context";

// TODO: UI improvements (message indication, Last message display)

function App() {
  let [userName, setUserName] = useState("");
  let [contactName, setContactName] = useState("Sundar");
  let [authToken, setAuthToken] = useState("");
  // TODO: Need to get the connected users from the backend
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
    async function getUserInfo() {
      let userInfo = await fetchUserAttributes();
      console.log(userInfo);
      let userName = userInfo.name;

      handleUserName(userName);
    }
    async function currentSession() {
      try {
        const { accessToken } = (await fetchAuthSession()).tokens ?? {};
        setAuthToken(accessToken.toString());
      } catch (err) {
        console.log(err);
      }
    }

    if (userName === "") {
      getUserInfo();
      currentSession();
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
    <UserContext.Provider value={authToken}>
      <div style={{ position: "relative", height: "100vh" }}>
        <MainContainer responsive>
          <Sidebar position="left">
            <Search placeholder="Search..." />
            <Conversations
              conversations={conversations}
              handleClick={handleClick}
            />
          </Sidebar>
          <Chats
            userName={userName}
            contactName={contactName}
            authToken={authToken}
          />
        </MainContainer>
      </div>
    </UserContext.Provider>
  );
}

export default App;
