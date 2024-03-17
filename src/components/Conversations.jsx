import {
  Avatar,
  Conversation,
  ConversationList,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

export default function Conversations() {
  let [conversations, setConversations] = useState([
    {
      name: "Lilly",
      status: "available",
      active: false,
    },
    {
      name: "Zoe",
      status: "available",
      active: true,
    },
  ]);

  let handleClick = (e) => {
    if (e.target.innerText === "") {
      console.log("Image clicked");
      return "";
    }
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
    <ConversationList>
      {conversations.map((conversation, id) => {
        return (
          <Conversation
            // info="Yes i can do it for you"
            // lastSenderName="Lilly"
            // unreadCnt={3}
            active={conversation.active}
            name={conversation.name}
            key={id}
            onClick={handleClick}
          >
            <Avatar
              name={conversation.name}
              src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
              status={conversation.status}
            />
          </Conversation>
        );
      })}
    </ConversationList>
  );
}
