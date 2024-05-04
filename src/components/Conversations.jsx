/* eslint-disable react/prop-types */
import {
  Avatar,
  Conversation,
  ConversationList,
} from "@chatscope/chat-ui-kit-react";
import useWebSocket from "react-use-websocket";
import { useContext, useEffect } from "react";
import UserContext from "../Context";

export default function Conversations({ conversations, handleClick }) {
  let authToken = useContext(UserContext);
  const { sendJsonMessage } = useWebSocket(
    // eslint-disable-next-line no-undef
    process.env.SERVER_URL,
    {
      onOpen: (e) => console.log(e),
      onClose: (e) => console.log(e),
      onMessage: (e) => console.log(e),
      share: true,
      queryParams: { name: "Krish" },
      protocols: [authToken],
    }
  );

  useEffect(() => {
    function getUsersList() {
      console.log("Hii");
      sendJsonMessage({
        action: "users",
      });
    }

    getUsersList();
  }, []);

  return (
    <ConversationList>
      {conversations.map((conversation, id) => {
        return (
          <Conversation
            // info="Yes i can do it for you"
            // lastSenderName="Lilly"
            // unreadCnt={3}
            active={conversation.active}
            name={
              conversation.self
                ? `${conversation.name} (You)`
                : conversation.name
            }
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
