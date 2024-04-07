/* eslint-disable react/prop-types */
import {
  Avatar,
  Conversation,
  ConversationList,
} from "@chatscope/chat-ui-kit-react";

export default function Conversations({ conversations, handleClick }) {
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
