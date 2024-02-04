import { useState } from "react";
import { chat, quest } from "../../chat/chat";

function Chat() {
  const [inputChat, setInputChat] = useState(""); // Estado para el input del chat
  const [inputQuest, setInputQuest] = useState(""); // Estado para el input del cuestionario
  const [thinkingChat, setThinkingChat] = useState(false); // Estado para indicar si el chat está pensando
  const [thinkingQuest, setThinkingQuest] = useState(false); // Estado para indicar si el cuestionario está pensando
  const [responseChat, setResponseChat] = useState(""); // Estado para la respuesta del chat
  const [responseQuest, setResponseQuest] = useState(""); // Estado para la respuesta del cuestionario

  // Manejador para el chat
  const handleChat = async () => {
    setThinkingChat(true);
    const completion = await chat(inputChat);
    setResponseChat(
      completion || "ChatGPT fue a tirar la basura, vuelve en 5 minutos."
    );
    setThinkingChat(false);
  };

  // Manejador para el cuestionario
  const handleQuest = async () => {
    setThinkingQuest(true);
    const completion = await quest(inputQuest);
    setResponseQuest(
      completion || "ChatGPT está ocupado, intenta nuevamente en unos momentos."
    );
    setThinkingQuest(false);
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="grid grid-cols-2 gap-4">
        <h1>Concept review</h1>
        <div className="text-center">
          <div className="my-10">
            {thinkingChat ? (
              <div className="badge badge-accent badge-outline">
                Thinking...
              </div>
            ) : (
              <div className="chat-bubble">{responseChat}</div>
            )}
            <div className="mt-4">
              <input
                type="text"
                onChange={(e) => setInputChat(e.target.value)}
                value={inputChat}
                placeholder="Type here terms to translate"
                className="input input-bordered input-primary w-full max-w-xs"
              />
              <button
                type="button"
                onClick={handleChat}
                className="btn bg-secondary ml-2"
              >
                Explain
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1>Concept quiz</h1>
          <h2>
            "1. What is the meaning of dApp? 2. What is the meaning of DAO? 3.
            What is the meaning of NFT? 4. What is the meaning of DeFi? 5. What
            is the meaning of Smart Contract?",
          </h2>
          <div className="text-center">
            <div className="my-10">
              {thinkingQuest ? (
                <div className="badge badge-accent badge-outline">
                  Thinking...
                </div>
              ) : (
                <div className="chat-bubble">{responseQuest}</div>
              )}
              <div className="mt-4">
                <input
                  type="text"
                  onChange={(e) => setInputQuest(e.target.value)}
                  value={inputQuest}
                  placeholder="Type here your answer"
                  className="input input-bordered input-primary w-full max-w-xs"
                />
                <button
                  type="button"
                  onClick={handleQuest}
                  className="btn bg-secondary ml-2"
                >
                  Submit answers
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Chat };
