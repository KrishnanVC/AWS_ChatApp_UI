/* eslint-disable react/prop-types */
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  VoiceCallButton,
  VideoCallButton,
  InfoButton,
} from "@chatscope/chat-ui-kit-react";
import { useState } from "react";

export default function Chats({ userName }) {
  console.log("re-rendering");
  let [avatar] = useState({
    name: userName,
    info: "Active 10 mins ago",
  });

  let [messages, setMessages] = useState([
    {
      direction: "incoming",
      message: "Hello my friend",
      position: "single",
      sender: "Zoe",
      sentTime: "15 mins ago",
      last: false,
    },
    {
      direction: "incoming",
      message: "Hello my friend",
      position: "single",
      sender: "Zoe",
      sentTime: "15 mins ago",
      last: true,
    },
    {
      direction: "outgoing",
      message: "Hello my friend",
      position: "single",
      sender: "Patrik",
      sentTime: "15 mins ago",
      last: true,
    },
  ]);
  let [message, setMessage] = useState("");

  let handleMessageAppend = (messageText) => {
    setMessage("");

    let message = {
      message: messageText,
      direction: "outgoing",
      position: "single",
      sender: userName,
      sentTime: "15 mins ago",
      last: true,
    };

    setMessages((messages) => {
      let lastMessage = messages[messages.length - 1];
      if (lastMessage.direction === "outgoing") {
        lastMessage.last = false;
      }

      let newMessages = messages
        .slice(0, messages.length - 1)
        .concat([lastMessage, message]);

      return newMessages;
    });
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          name={avatar.name}
          src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
        />
        <ConversationHeader.Content info={avatar.info} userName={avatar.name} />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
      // typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        {messages.map((message, id) => {
          if (message.last) {
            return (
              <Message key={id} model={message}>
                <Avatar
                  name={message.name}
                  src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
                />
              </Message>
            );
          } else {
            return <Message avatarSpacer key={id} model={message} />;
          }
        })}
      </MessageList>
      <MessageInput
        autoFocus
        value={message}
        onChange={(e) => setMessage(e)}
        onSend={() => handleMessageAppend(message)}
        placeholder="Type message here"
      />
    </ChatContainer>
  );
}
