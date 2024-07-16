import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:4000";

const socket = io(URL);

export const Console = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [allClients, setClietns] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(message) {
      setMessages((prevMessages) => [...prevMessages, message]);
    }

    function onClientsDataGet(message) {
      setClietns(JSON.parse(message));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("chat message", onMessage);
    socket.on("clientsData", onClientsDataGet);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat message", onMessage);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageText !== "") {
      socket.emit("chat message", `${socket.id}: ` + messageText);
      setMessageText("");
    }
  };

  return (
    <section className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-2 rounded bg-[grey] min-h-[600px] min-w-[800px]">
      <h1 className="bg-black p-2 mb-2">
        CONSOLE [
        {isConnected ? (
          <span className="text-[green]">Online</span>
        ) : (
          <span className="text-[red]">OFFLINE</span>
        )}
        ]
      </h1>
      <div className="bg-black h-[100%] min-h-[600px] p-2">
        <h2 className="bg-[grey] p-1 rounded mb-2">Messages:</h2>
        <div className="overflow-y-scroll bg-[grey] p-1 mb-2 rounded min-h-[500px] max-h-[500px]">
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <form className="flex">
          <input
            placeholder="type ur message"
            className="outline-none bg-[grey] p-1 rounded w-[100%] resize-none"
            value={messageText}
            onChange={(e) => {
              setMessageText(e.target.value);
            }}
          />
          <button
            className="bg-[grey] p-1 rounded ml-2 outline-none"
            onClick={handleSendMessage}
          >
            send
          </button>
        </form>
      </div>

      <div className="absolute top top-[50%] left-[-20%] translate-x-[-50%]">
        <p>{allClients.length} clients</p>
        <ul>
          {allClients.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};
