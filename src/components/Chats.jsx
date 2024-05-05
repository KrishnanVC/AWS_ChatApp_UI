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

export default function Chats({ userName, contactName, authToken }) {
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    process.env.SERVER_URL,
    {
      onOpen: (e) => console.log(e),
      onClose: (e) => console.log(e),
      onMessage: (e) => console.log(e),
      share: true,
      queryParams: { name: userName === null ? "" : userName },
      protocols: ["authorization", authToken],
      filter: (message) => JSON.parse(message.data).action === "send",
    }
  );

  let [messages, setMessages] = useState({});
  let [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    handleMessageReceive();
  }, [lastJsonMessage]);

  let handleMessageReceive = () => {
    if (lastJsonMessage !== null) {
      let messageText = lastJsonMessage.message;
      let sender = lastJsonMessage.sent_by;
      handleMessageAppend(messageText, "incoming", sender);
    }
  };

  let handleMessageSend = (messageText) => {
    setMessageInput("");
    sendJsonMessage({
      action: "send",
      send_to: contactName,
      sent_by: userName,
      message: messageText,
    });
    handleMessageAppend(messageText, "outgoing", contactName);
  };

  let handleMessageAppend = (messageText, direction, sender) => {
    let message = {
      message: messageText,
      direction: direction,
      position: "single",
      sender: sender,
      sentTime: "15 mins ago",
      last: true,
    };

    setMessages((chats) => {
      console.log(sender);
      if (chats[sender] === undefined) {
        chats[sender] = [];
      }
      let messages = chats[sender];

      let newMessages = null;
      if (messages.length > 0) {
        let lastMessage = messages[messages.length - 1];
        if (lastMessage.direction === message.direction) {
          lastMessage.last = false;
        }
        newMessages = messages
          .slice(0, messages.length - 1)
          .concat([lastMessage, message]);
      } else {
        newMessages = [message];
      }

      console.log(newMessages);
      let newChats = {
        ...chats,
        [sender]: newMessages,
      };
      console.log(newChats);
      return newChats;
    });
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          name={contactName === userName ? `${contactName} (You)` : contactName}
          src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
        />
        <ConversationHeader.Content
          info="Active"
          userName={
            contactName === userName ? `${contactName} (You)` : contactName
          }
        />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <InfoButton />
        </ConversationHeader.Actions>
      </ConversationHeader>
      <MessageList>
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
        value={messageInput}
        onChange={(e) => setMessageInput(e)}
        onSend={() => handleMessageSend(messageInput)}
        placeholder="Type message here"
      />
    </ChatContainer>
  );
}
