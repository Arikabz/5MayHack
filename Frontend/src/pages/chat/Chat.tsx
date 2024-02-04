import { useState } from "react";
import { chat, quest } from "../../chat/chat";

function Chat() {
  const [input, setInput] = useState(""); // Estado para almacenar el input del usuario
  const [thinking, setThink] = useState(false);
  const [res, setRes] = useState(""); // Estado para almacenar la respuesta del chat

  const handleChat = async () => {
    setThink(true);
    const completion = await chat(input); // Pasa el input del usuario a la función chat
    if (completion) {
      setRes(completion);
      setThink(false);
    } else {
      setRes("ChatGPT fue a tirar la basura, vuelve en 5 minutos.");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="grid grid-cols-2 gap-10">
        <div className="hero-content text-center">
          <div className="max-w-bg">
            <div className="chat chat-start my-10">
              <div className="chat-bubble">{res}</div>
            </div>
            {thinking && (
              <div className="badge badge-accent badge-outline">
                Thinking...
              </div>
            )}
            <div className="content-center">
              <div className="grid-cols-2 gap-10">
                <input
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder="Type here"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
                <button
                  type="button"
                  onClick={handleChat}
                  className="btn bg-secondary"
                >
                  Explicar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-content text-center">
          <div className="max-w-bg">
            <div className="chat chat-start my-10">
              <div className="chat-bubble">
                <h1>Quest</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Chat };
