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
import { useState, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export default function Chats({ userName, contactName }) {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "wss://u4vbtuqd35.execute-api.us-east-1.amazonaws.com/Prod",
    {
      onOpen: (e) => console.log(e),
      onClose: (e) => console.log(e),
      onMessage: (e) => console.log(e),
      share: true,
      queryParams: { name: userName },
    }
  );

  let [messages, setMessages] = useState({
    Sundar: [
      {
        message: "Hi",
        direction: "incoming",
        position: "single",
        sender: "Sundar",
        sentTime: "15 mins ago",
        last: true,
      },
    ],
    Gokul: [
      {
        message: "Hi da",
        direction: "incoming",
        position: "single",
        sender: "Gokul",
        sentTime: "15 mins ago",
        last: true,
      },
    ],
  });
  let [message, setMessage] = useState("");

  useEffect(() => {
    if (lastJsonMessage !== null) {
      let messageText = lastJsonMessage.message;
      handleMessageAppend(messageText, "incoming");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage]);

  let handleSendMessage = (messageText) => {
    setMessage("");
    sendJsonMessage({
      action: "send",
      send_to: contactName,
      sent_by: userName,
      message: messageText,
    });
    handleMessageAppend(messageText, "outgoing");
  };

  let handleMessageAppend = (messageText, direction) => {
    let message = {
      message: messageText,
      direction: direction,
      position: "single",
      sender: userName,
      sentTime: "15 mins ago",
      last: true,
    };

    setMessages((chats) => {
      let messages = chats[contactName];
      let lastMessage = messages[messages.length - 1];
      if (lastMessage.direction === direction) {
        lastMessage.last = false;
      }

      let newMessages = messages
        .slice(0, messages.length - 1)
        .concat([lastMessage, message]);

      let newChats = {
        ...chats,
        contactName: newMessages,
      };
      return newChats;
    });
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          name={contactName}
          src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
        />
        <ConversationHeader.Content info="Active" userName={contactName} />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList
      // typingIndicator={<TypingIndicator content="Zoe is typing" />}
      >
        {messages[contactName] &&
          messages[contactName].map((message, id) => {
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
        onSend={() => handleSendMessage(message)}
        placeholder="Type message here"
      />
    </ChatContainer>
  );
}
