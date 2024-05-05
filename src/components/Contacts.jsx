import {
  Avatar,
  Conversation,
  ConversationList,
} from "@chatscope/chat-ui-kit-react";
import useContacts from "../hooks/useContacts";

export default function Contacts({
  userName,
  contactName,
  setContactName,
  authToken,
}) {
  let contacts = useContacts(userName, authToken);

  let handleContactChange = (e) => {
    if (e.target.innerText === "") {
      console.log("Image clicked");
      return "";
    }
    let name = e.target.innerText;
    if (name.endsWith(" (You)")) {
      name = name.split(" (You)")[0];
    }
    setContactName(name);
  };

  return (
    <>
      <Conversation
        active={userName === contactName}
        name={`${userName} (You)`}
        onClick={handleContactChange}
      >
        <Avatar
          name={`${userName} (You)`}
          src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
          status="available"
        />
      </Conversation>
      <ConversationList>
        {contacts.map((conversation, id) => {
          return (
            <Conversation
              active={conversation.name === contactName}
              name={conversation.name}
              key={id}
              onClick={handleContactChange}
            >
              <Avatar
                name={conversation.name}
                src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                status={conversation.status ? "available" : "unavailable"}
              />
            </Conversation>
          );
        })}
      </ConversationList>
    </>
  );
}
