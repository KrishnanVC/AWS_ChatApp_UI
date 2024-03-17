import { MainContainer, Sidebar, Search } from "@chatscope/chat-ui-kit-react";
// import { WebSocketDemo } from "./WebSocket";
import Conversations from "./components/Conversations";
import Chats from "./components/chat/Chats";

function App() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* <WebSocketDemo /> */}
      <MainContainer responsive>
        <Sidebar position="left">
          <Search placeholder="Search..." />
          <Conversations />
        </Sidebar>
        <Chats userName={"Zoe"} />
      </MainContainer>
    </div>
  );
}

export default App;
