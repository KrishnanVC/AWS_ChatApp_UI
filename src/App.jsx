import { MainContainer, Sidebar, Search } from "@chatscope/chat-ui-kit-react";
import Contacts from "./components/Contacts";
import Chats from "./components/Chats";
import { useState } from "react";
import useUserName from "./hooks/useUserName";
import useAuthToken from "./hooks/useAuthToken";

function App() {
  let userName = useUserName();
  let [contactName, setContactName] = useState(null);
  let authToken = useAuthToken();

  if (authToken === null || userName === null) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <MainContainer responsive>
        <Sidebar position="left">
          <Search placeholder="Search..." />
          <Contacts
            userName={userName}
            contactName={contactName === null ? userName : contactName}
            setContactName={setContactName}
            authToken={authToken}
          />
        </Sidebar>
        <Chats
          userName={userName}
          contactName={contactName === null ? userName : contactName}
          authToken={authToken}
        />
      </MainContainer>
    </div>
  );
}

export default App;
