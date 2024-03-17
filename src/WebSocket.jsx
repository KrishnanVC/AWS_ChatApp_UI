import { useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

export const WebSocketDemo = () => {
  const { sendJsonMessage, readyState } = useWebSocket(
    "wss://yw0325xl9k.execute-api.us-east-1.amazonaws.com/Prod?name=kri",
    {
      onOpen: (e) => console.log(e),
      onClose: (e) => console.log(e),
      onMessage: (e) => console.log(e),
    }
  );

  const handleClickSendMessage = useCallback(
    () =>
      sendJsonMessage({
        action: "send",
        send_to: "sun",
        message: "Hi",
      }),
    []
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
    </div>
  );
};
